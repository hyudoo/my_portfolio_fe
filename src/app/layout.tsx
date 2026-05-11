import { LanguageProvider } from "@/lib/i18n";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "../components/providers/theme-provider/ThemeProvider";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "DevPortfolio | Junior Fullstack Developer",
  description:
    "Junior Fullstack Developer specializing in building exceptional digital experiences. Expert in React, Next.js, Node.js, and modern web technologies.",
  keywords: ["fullstack developer", "web developer", "react", "next.js", "node.js", "portfolio"],
  authors: [{ name: "Developer" }],
  creator: "Developer",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devportfolio.com",
    siteName: "DevPortfolio",
    title: "DevPortfolio | Junior Fullstack Developer",
    description: "Junior Fullstack Developer specializing in building exceptional digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevPortfolio | Junior Fullstack Developer",
    description: "Junior Fullstack Developer specializing in building exceptional digital experiences.",
    creator: "@developer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased bg-background">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
