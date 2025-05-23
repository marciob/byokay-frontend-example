// app/components/Chatbot.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { ByokayKey } from "byokay-kit";

const byokayKey = new ByokayKey();

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! How can I help you today?", sender: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef<number>(2);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getNextId = (): number => {
    const id = nextIdRef.current;
    nextIdRef.current += 1;
    return id;
  };

  const handleSend = async () => {
    const question = input.trim();
    if (!question) return;

    const newMessageId = getNextId();
    setMessages((prev) => [
      ...prev,
      { id: newMessageId, text: question, sender: "user" },
    ]);
    setInput("");
    setIsLoading(true);

    const { openai } = byokayKey.getKeys("openai");
    if (!openai) {
      setMessages((prev) => [
        ...prev,
        {
          id: getNextId(),
          text: "🔑 To get started, please connect your Openai key using the “Connect AI” button.",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      }));

      chatHistory.push({ role: "user", content: question });

      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openai}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: chatHistory,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          `API responded with status ${res.status}: ${
            errorData?.error?.message || "Unknown error"
          }`
        );
      }

      const data = await res.json();
      if (!data.choices || data.choices.length === 0) {
        throw new Error("No response choices returned from OpenAI");
      }

      const answer = data.choices[0]?.message?.content;
      if (!answer) {
        throw new Error("Empty response content from OpenAI");
      }

      setMessages((prev) => [
        ...prev,
        { id: getNextId(), text: answer, sender: "ai" },
      ]);
    } catch (err) {
      console.error("OpenAI API Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: getNextId(),
          text: `⚠️ ${
            err instanceof Error
              ? err.message
              : "Request failed — check console for details."
          }`,
          sender: "ai",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) handleSend();
  };

  return (
    <div className="w-full flex flex-col h-[500px]">
      {/* Header Area: Changed px-4 py-3 to p-4 */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
      </div>

      {/* Message List Area: p-4 and space-y-2 already adhere to 8dp grid */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {/* Message Bubble: px-4 py-2 and rounded-lg already adhere */}
            <div
              className={`px-4 py-2 rounded-lg text-sm max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            {/* Thinking Bubble: px-4 py-2 and rounded-lg already adhere */}
            <div className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-900">
              <span className="animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area: Changed p-3 to p-6. gap-2 already adheres. */}
      <div className="p-6 border-t border-gray-100 flex gap-2">
        {/* Input Field: Changed px-3 to px-4. py-2 and rounded-lg already adhere. */}
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {/* Send Button: px-4 py-2 and rounded-lg already adhere. */}
        <button
          onClick={handleSend}
          disabled={isLoading}
          className={`px-4 py-2 rounded-lg text-sm text-white transition ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}
