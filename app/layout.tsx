import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gail Alderson - Product Designer",
  description: "Product design, engineering, and research by Gail Alderson.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
