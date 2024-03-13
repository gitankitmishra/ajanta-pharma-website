import { NavbarType } from "@/types/navbar";
import { HeaderNavProps } from "@/types/sample";

export const EmployeeNavbar: NavbarType[] = [
  {
    value: "Home",
    href: "/home",
  },
  {
    value: "My-Courses",
    href: "/my-courses",
  },
  {
    value: "Assessments",
    href: "/assessments",
  },
  {
    value: "Certification",
    href: "/certification",
  },
  {
    value: "Setting",
    href: "/setting",
  },
];

export const AdminNavbar: NavbarType[] = [
  {
    value: "Dashboard",
    href: "/admin/admin-dashboard",
  },
  {
    value: "Course Category",
    href: "/admin/Admin-course-category",
  },
  {
    value: "Course",
    href: "/admin/admin-courses",
  },
  {
    value: "Notification",
    href: "/admin-notification",
  },
  {
    value: "Settings",
    href: "/admin-setting",
  },
];
