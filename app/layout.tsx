// imports next metadata type
import type { Metadata } from "next";
// imports global css
import "./globals.css";

// sets page metadata
export const metadata: Metadata = {
  title: "To-Do List",
  description: "simple to-do list",
};

// root layout wrapper
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // sets html language to english
    <html lang="en">
      {/* sets main body layout */}
      <body className="min-h-screen bg-white text-zinc-800">
        {children}
      </body>
    </html>
  );
}
