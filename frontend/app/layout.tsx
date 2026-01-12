import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindMine Money - AI-Powered Educational Marketplace",
  description: "Fair compensation for educators. Affordable learning for students. Transform education with AI-powered content valuation.",
  keywords: ["education", "AI", "marketplace", "Thailand", "learning", "teaching"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
