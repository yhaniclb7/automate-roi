import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutomateROI — AI Automation Savings Calculator",
  description: "Calculate how much your business could save with AI automation. Free ROI calculator for small and mid-size businesses.",
  openGraph: {
    title: "AutomateROI — AI Automation Savings Calculator",
    description: "Calculate how much your business could save with AI automation.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
