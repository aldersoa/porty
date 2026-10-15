import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gail Alderson - About",
    template: "Gail Alderson - %s",
  },
  description: "Product design, engineering, and research by Gail Alderson.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/gail-alderson-favicon.ico", sizes: "any" },
      { url: "/gail-alderson-favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/gail-alderson-favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/gail-alderson-favicon.ico",
    apple: [
      {
        url: "/gail-alderson-apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
