import { ReactNode } from "react";

interface LayoutProps {
  nav: ReactNode;
  children: ReactNode;
}

export function Layout({ nav, children }: LayoutProps) {
  return (
    <div
      style={{
        display: "flex",
        gap: 64,
        padding: "0 32px",
        maxWidth: "48rem",
        margin: "64px auto",
      }}
    >
      {nav}
      <div
        style={{
          height: "8rem",
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 48px",
          background: "#BFF6F8",
          borderRadius: 8,
        }}
      >
        {children}
      </div>
    </div>
  );
}
