import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SPORTFARA — Where Sports Begin",
  description: "African sports intelligence — daily match briefings, odds analysis, and creator tools. EN + FR.",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#262938",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body className="bg-primary-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
