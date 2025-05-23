// app/page.tsx
import { AIKeyProvider } from "./components/AIKeyProvider";
import Chatbot from "./components/Chatbot";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-6 relative">
      <AIKeyProvider>
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-xl">
          <Chatbot />
        </div>
      </AIKeyProvider>
    </div>
  );
}
