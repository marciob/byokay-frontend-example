// app/components/ViewSwitcher.tsx
"use client";
import { useEffect, useState } from "react";
import MobileMessage from "./MobileMessage";

interface ViewSwitcherProps {
  children: React.ReactNode; // ← accept children, not mainContent
}

export default function ViewSwitcher({ children }: ViewSwitcherProps) {
  const [w, setW] = useState(0);

  useEffect(() => {
    setW(innerWidth);
    const handler = () => setW(innerWidth);
    addEventListener("resize", handler);
    return () => removeEventListener("resize", handler);
  }, []);

  return (
    <>
      {/* mobile only */}
      <div className="sm:hidden">
        <MobileMessage />
      </div>

      {/* desktop only */}
      <div className="max-sm:hidden">{children}</div>
    </>
  );
}
