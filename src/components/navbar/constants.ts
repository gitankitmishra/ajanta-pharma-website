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
    value: "AdminDashboard",
    href: "/admin-dashboard",
  },
  {
    value: "AdminCourseCategory",
    href: "/Admin-course-category",
  },
  {
    value: "AdminCourses",
    href: "/admin-courses",
  },
  {
    value: "AdminNotification",
    href: "/admin-notification",
  },
  {
    value: "AdminSetting",
    href: "/admin-setting",
  },
];
