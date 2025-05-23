import { ByokayKey } from "byokay-kit";

export class AIService {
  private byokayKey: ByokayKey;

  constructor() {
    this.byokayKey = new ByokayKey();
  }

  async callOpenAI(prompt: string) {
    const { openai } = this.byokayKey.getKeys("openai");

    if (!openai) {
      throw new Error(
        "OpenAI API key not found. Please connect your key first."
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${openai}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    return response.json();
  }

  async callClaude(prompt: string) {
    const { claude } = this.byokayKey.getKeys("claude");

    if (!claude) {
      throw new Error(
        "Claude API key not found. Please connect your key first."
      );
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": claude,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-opus-20240229",
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`Claude API error: ${response.statusText}`);
    }

    return response.json();
  }

  hasKey(
    provider: "openai" | "claude" | "gemini" | "grok" | "deepseek"
  ): boolean {
    const keys = this.byokayKey.getKeys(provider);
    return !!keys[provider];
  }
}
