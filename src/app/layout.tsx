"use client";
// import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";
import Navbar from "@/components/navbar";
import { usePathname, useRouter } from "next/navigation";
import { CourseProvider } from "@/context/course_context";

const raleway = Raleway({ subsets: ["latin"] });

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
  const hideNavbar =
    currentPath === "/admin/admin-add-course" ||
    currentPath === "/admin/admin-course-detail";

  return (
    <CourseProvider>
      <html lang="en">
        <body className={`main-body ${raleway.className}`}>
          {!hideNavbar && <Navbar user_type="manager" />}
          {/* <main>{children}</main> */}
          {children}
        </body>
      </html>
    </CourseProvider>
  );
}
