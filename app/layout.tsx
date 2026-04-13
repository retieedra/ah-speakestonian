import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SpeakEstonian",
  description: "A new way to learn Estonian. Visual grammar, audio immersion, smart repetition.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
