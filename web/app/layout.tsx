import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { clsx } from "clsx";
import { ThemeProvider } from "@/components/theme-provider";
import { ContextProvider } from "@/context";
import { headers } from "next/headers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dailiy | On-Chain Journaling for Web3 Builders",
  description: "The definitive on-chain journaling standard for the Web3 ecosystem. Capture your thoughts, code logic, and trade rationales effortlessly.",
  other: {
    'fc:frame': JSON.stringify({
      version: "next",
      imageUrl: "https://dailiy.vercel.app/og-image.png",
      button: {
        title: "Launch Dailiy",
        action: { type: 'launch_frame', name: 'Dailiy', url: 'https://dailiy.vercel.app', splashImageUrl: 'https://dailiy.vercel.app/splash.png', splashBackgroundColor: '#001F3F' }
      }
    })
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = (await headers()).get('cookie')

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(inter.variable, "antialiased font-sans bg-background text-foreground min-h-screen flex flex-col")}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ContextProvider cookies={cookies}>
            {children}
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
