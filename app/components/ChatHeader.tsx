// app/components/ChatHeader.tsx
"use client";

import React from "react";

/**
 * Renders the header section of the chat panel.
 * It displays a static title "AI Assistant".
 */
export default function ChatHeader() {
  return (
    <div className="p-4 border-b border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
    </div>
  );
}
