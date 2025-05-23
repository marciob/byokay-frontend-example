// app/components/AIKeyProvider.tsx (Fixed for Hydration Error)
"use client";

import { ByokayKeyProvider, SupportedProvider } from "byokay-kit";
import { useState, useEffect } from "react"; // Make sure these are imported

const supportedProviders: SupportedProvider[] = [
  "openai",
  "claude",
  "gemini",
  "grok",
  "deepseek",
];

export function AIKeyProvider({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, after the initial render
    setHasMounted(true);
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <>
      <div className="absolute right-6 top-6 z-10">
        <ByokayKeyProvider providers={supportedProviders}>
          {(openModal, hasAnyKey) => {
            // Determine button text and title:
            // - If not yet mounted on the client, default to "Connect AI" state.
            // - If mounted, use the actual `hasAnyKey` status.
            const showAsConnected = hasMounted && hasAnyKey;

            const buttonText = showAsConnected ? "AI Connected" : "Connect AI";
            const buttonTitle = showAsConnected
              ? "Manage your AI API keys"
              : "Connect your AI API keys";

            return (
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors hover:bg-blue-100"
                title={buttonTitle}
              >
                {buttonText}
              </button>
            );
          }}
        </ByokayKeyProvider>
      </div>
      {children}
    </>
  );
}
