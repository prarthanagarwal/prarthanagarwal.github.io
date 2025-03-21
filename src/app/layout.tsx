import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { satoshi, instrumentSerif } from "./fonts";

export const metadata: Metadata = {
  title: "Prarthan Agarwal",
  description: "A minimal personal portfolio website.",
  icons: {
    icon: "/favicon.ico"
  },
  // Open Graph metadata for social media sharing
  openGraph: {
    title: "Prarthan Agarwal",
    description: "A minimal personal portfolio website.",
    url: "https://prarthandon.vercel.app/",
    siteName: "Prarthan Agarwal",
    images: [
      {
        url: "/favicon.ico", // Using your profile image
        width: 1200,
        height: 630,
        alt: "Prarthan Agarwal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Prarthan Agarwal",
    description: "A minimal personal portfolio website.",
    images: ["/favicon.ico"], // Using your profile image
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
