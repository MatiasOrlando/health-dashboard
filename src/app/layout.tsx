import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";
import { Sidebar } from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Medical Coach Dashboard",
  description: "Patient management for health coaches",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body>
        <QueryProvider>
          <div className="app-shell">
            <Sidebar />
            <main className="main-content">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
