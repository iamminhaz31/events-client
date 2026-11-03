import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NeighborHub | Community Service Events",
  description:
    "Create, join and track community service events in your local area.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}