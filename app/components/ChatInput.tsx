// app/components/ChatInput.tsx
"use client";

import React from "react";

interface ChatInputProps {
  input: string; // Current value of the input field
  setInput: (value: string) => void; // Function to update the input value
  handleSend: () => void; // Function to call when the send button is clicked
  isLoading: boolean; // Flag to disable input and button during loading
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Function to handle key presses (e.g., Enter)
}

/**
 * Renders the chat input field and the send button.
 */
export default function ChatInput({
  input,
  setInput,
  handleSend,
  isLoading,
  handleKeyDown,
}: ChatInputProps) {
  return (
    <div className="p-6 border-t border-gray-100 flex gap-2">
      <input
        type="text"
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={isLoading}
      />
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
  );
}
