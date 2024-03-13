import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";

export const metadata: Metadata = {
  title: "Ajanta Pharma Limited",
  description: "An admin to manage you ecommerce applications and websites",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = true;
  return (
    <html lang="en">
      <body className="main-body">
      <Navbar isAdmin={isAdmin} />
        <main>{children}</main>
      </body>
    </html>
  );
}
