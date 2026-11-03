import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeighborHub",
  description:
    "Create, join and track social service events in your community.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}