import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KAOSPILOT Community Voting",
  description: "Vote for the most attractive Kaospilot student",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
