import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import "./revamp.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Better Uptime | SaaS Monitoring Landing Page",
  description:
    "A polished SaaS landing page for Better Uptime with uptime monitoring, incident response, and status page messaging.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const stored = window.localStorage.getItem("betteruptime-theme");
              const theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
              document.documentElement.dataset.theme = theme;
            } catch (_) {}
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
