// app/components/ChatMessage.tsx
"use client";

import React from "react";
import { Message } from "../types"; // Import the shared Message interface

interface ChatMessageProps {
  message: Message; // Prop to pass the message object
}

/**
 * Renders a single chat message bubble.
 * Styles the bubble differently based on whether the sender is "user" or "ai".
 */
export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-2 rounded-lg text-sm max-w-[75%] break-words ${
          // Added break-words for long messages
          message.sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-100 text-gray-900"
        }`}
      >
        {message.text}
      </div>
    </div>
  );
}
