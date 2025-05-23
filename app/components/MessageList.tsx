// app/components/MessageList.tsx
"use client";

import React from "react";
import ChatMessage from "./ChatMessage";
import { Message } from "../types"; // Import the shared Message interface

interface MessageListProps {
  messages: Message[]; // Array of messages to display
  isLoading: boolean; // Flag to show the "Thinking..." indicator
  messagesEndRef: React.RefObject<HTMLDivElement>; // Ref for scrolling to the bottom
}

/**
 * Renders the list of chat messages and the "Thinking..." indicator.
 * Automatically scrolls to the latest message.
 */
export default function MessageList({
  messages,
  isLoading,
  messagesEndRef,
}: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="flex justify-start">
          <div className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-900">
            <span className="animate-pulse">Thinking...</span>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} /> {/* Element to scroll to */}
    </div>
  );
}
