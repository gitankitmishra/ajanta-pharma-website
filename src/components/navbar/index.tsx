import React, { FunctionComponent } from "react";
import "./style.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon } from "@/components/icons/home-icon";
import { MenuBarIcon } from "@/components/icons/menu-bar-icon";
import { SettingIcon } from "@/components/icons/setting-icon";
import { GraduationCapIcon } from "@/components/icons/graduation-cap-icon";
import { AssessmentIcon } from "@/components/icons/assessment-icon";
import { CertificateIcon } from "@/components/icons/certificate-icon";
import { LogoutIcon } from "@/components/icons/logout-icon";
import { AdminNavbar, EmployeeNavbar, ManagerNavbar } from "./constants";

interface NavbarProps {
  user_type: "admin" | "employee" | "manager";
}

const Navbar: FunctionComponent<NavbarProps> = ({ user_type }) => {
  const isAdminPath = usePathname().startsWith("/admin");
  let navLinks: any[];

  // Choose the appropriate navbar links based on user_type and isAdminPath
  if (isAdminPath) {
    navLinks = AdminNavbar;
  } else if (user_type === "manager") {
    navLinks = ManagerNavbar;
  } else if (user_type === "employee") {
    navLinks = EmployeeNavbar;
  } else {
    navLinks = AdminNavbar;
  }

  const currentPath = usePathname();

  return (
    <nav className="nav-main-container">
      <div className="navbar">
        <div className="navbar-logo">
          <button>
            <MenuBarIcon />
            Menu
          </button>
        </div>
        <div className="navbar-links">
          {navLinks.map((el, i) => (
            <Link
              key={i}
              href={el.href}
              className={`navbutton ${currentPath === el.href ? "active" : ""}`}
            >
              <div className="nav-icon">
                {/* Render the appropriate icon based on the value */}
                {el.value === "Home" && <HomeIcon />}
                {el.value === "My Courses" && <GraduationCapIcon />}
                {el.value === "Assessments" && <AssessmentIcon />}
                {el.value === "My Certifications" && <CertificateIcon />}
                {user_type === "manager" && el.value === "Team Performance" && (
                  <CertificateIcon />
                )}{" "}
                {/* Render only for manager */}
                {el.value === "Setting" && <SettingIcon />}
                {el.value === "Dashboard" && <HomeIcon />}
                {el.value === "Course Category" && <GraduationCapIcon />}
                {el.value === "Courses" && <AssessmentIcon />}
                {el.value === "Notification" && <CertificateIcon />}
                {el.value === "Settings" && <SettingIcon />}
              </div>
              <div className="nav-text">{el.value}</div>
            </Link>
          ))}
          <Link href="/logout">
            <LogoutIcon />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
