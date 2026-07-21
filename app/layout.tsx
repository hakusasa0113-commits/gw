import type { Metadata } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Groundwork — Volunteering that builds your personal statement",
  description:
    "Find volunteering opportunities matched to your university course, and turn them into strong personal statement material.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/*
        suppressHydrationWarning on <html> prevents React from warning
        when the ThemeProvider adds/removes the "dark" class on the client,
        which would otherwise mismatch the server-rendered HTML.

        The inline script below runs synchronously before React hydrates,
        so the correct class is applied before any paint — eliminating
        the flash of wrong theme (FOWT).
      */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var stored = localStorage.getItem('gw-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (!stored && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();
            `.trim(),
          }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${inter.variable} ${plexMono.variable} font-body`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
