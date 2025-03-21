import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { satoshi, instrumentSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Prarthan Agarwal",
  description: "A minimal personal portfolio website made with Next.js, React and Tailwind CSS",
  icons: {
    icon: "/images/favicon.ico",
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
