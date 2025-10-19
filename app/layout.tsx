"use client"; // Required because we're using SessionProvider

import "./style.css"; // Your own CSS file instead of Tailwind
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        {/* Remove Tailwind CDN link */}
        {/* You can add any other meta or links here */}
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
