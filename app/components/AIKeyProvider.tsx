// app/components/AIKeyProvider.tsx
"use client";

import { ByokayKeyProvider, SupportedProvider } from "byokay-kit";

const supportedProviders: SupportedProvider[] = [
  "openai",
  "claude",
  "gemini",
  "grok",
  "deepseek",
];

export function AIKeyProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="absolute right-6 top-6 z-10">
        <ByokayKeyProvider providers={supportedProviders}>
          {(openModal, hasAnyKey) => (
            <button
              onClick={openModal}
              className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors hover:bg-blue-100"
              title={
                hasAnyKey
                  ? "Manage your AI API keys"
                  : "Connect your AI API keys"
              }
            >
              {hasAnyKey ? "AI Connected" : "Connect AI"}
            </button>
          )}
        </ByokayKeyProvider>
      </div>
      {children}
    </>
  );
}
