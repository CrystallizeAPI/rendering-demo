import { ReactNode } from "react";

interface LayoutProps {
  nav: ReactNode;
  children: ReactNode;
}

export function Layout({ nav, children }: LayoutProps) {
  return (
    <div style={{ display: "flex", gap: 64, padding: "0 32px" }}>
      {nav}
      <div
        style={{
          padding: "4px 32px",
          flex: 1,
          background: "#eee",
          borderRadius: 4,
        }}
      >
        {children}
      </div>
    </div>
  );
}
