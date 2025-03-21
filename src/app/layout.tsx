import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { satoshi, instrumentSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Prarthan Agarwal",
  description: "A minimal personal portfolio website made with Next.js, React and Tailwind CSS",
  icons: {
    icon: [
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: { url: "/images/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    shortcut: "/images/favicon.ico",
    other: [
      { url: "/images/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          satoshi.variable,
          instrumentSerif.variable,
          "text-body selection:bg-primary selection:text-hoverColor mx-auto my-8 max-w-full px-4 md:my-16 md:max-w-[1200px]"
        )}
      >
        {children}
      </body>
    </html>
  );
}
