import type { Metadata } from "next";
import "./globals.css";

// Remove font variables from SSR
export const metadata: Metadata = {
  title: "Expense Management App",
  description: "Inventory & Expense Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
