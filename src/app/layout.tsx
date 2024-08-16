import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: 'device-width, initial-scale=1'
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixels",
  description: "PixelPlay",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
