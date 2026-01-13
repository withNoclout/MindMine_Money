import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mind Mine | Turn Notes into Currency",
  description: "The AI-powered marketplace where your neat handwriting pays for your coffee.",
};

import { PageLoader } from "@/components/ui/PageLoader";
import { AuthProvider } from "@/lib/auth-context";
import { SessionProvider } from "@/providers/SessionProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-zinc-800 selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }} suppressHydrationWarning>
        <PageLoader />
        <AuthProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

