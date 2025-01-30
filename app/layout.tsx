import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Fira_Sans } from "next/font/google";
import "./globals.css";

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Thomas Waldick's Portfolio",
  description: "Thomas Waldick's professional portfolio site containing CV and other information.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${firaSans.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
