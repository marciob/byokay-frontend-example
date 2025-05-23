// app/components/ViewSwitcher.tsx
"use client";
import MobileMessage from "./MobileMessage";

interface ViewSwitcherProps {
  children: React.ReactNode;
}

export default function ViewSwitcher({ children }: ViewSwitcherProps) {
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
