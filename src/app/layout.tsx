"use client"
// import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";

// export const metadata: Metadata = {
//   title: "Ajanta Pharma Limited",
//   description: "An admin to manage you ecommerce applications and websites",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = true;
  const currentPath = usePathname();
  const hideNavbar = currentPath === "/admin/admin-add-course";
  return (
    <html lang="en">
      <body className="main-body">
      {!hideNavbar && <Navbar isAdmin={isAdmin} />}
        <main>{children}</main>
      </body>
    </html>
  );
}
