"use client"; // Required because we're using SessionProvider

import './globals.css';
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
