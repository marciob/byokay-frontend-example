// app/types.ts
export interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}
