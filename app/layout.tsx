// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ViewSwitcher from "./components/ViewSwitcher";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Frontend Example for Byorkay",
  // Next.js will turn this into <meta name="viewport" …> in <head>
  viewport: { width: "device-width", initialScale: 1 },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body suppressHydrationWarning>
        <ViewSwitcher>{children}</ViewSwitcher>
      </body>
    </html>
  );
}
