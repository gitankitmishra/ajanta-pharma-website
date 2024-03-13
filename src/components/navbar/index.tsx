"use client";
import "./style.css";

import { FunctionComponent, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { HomeIcon } from "@/components/icons/home-icon";
import { MenuBarIcon } from "@/components/icons/menu-bar-icon";
import { SettingIcon } from "@/components/icons/setting-icon";
import { GraduationCapIcon } from "@/components/icons/graduation-cap-icon";
import { AssessmentIcon } from "@/components/icons/assessment-icon";
import { CertificateIcon } from "@/components/icons/certificate-icon";
import { LogoutIcon } from "@/components/icons/logout-icon";
import { AdminNavbar, EmployeeNavbar } from "./constants";
// import { NavbarType } from "@/types/navbar";

interface NavbarProps {
  isAdmin: boolean;
}

const Navbar: FunctionComponent<NavbarProps> = ({ isAdmin }) => {
  const navLinks = isAdmin ? AdminNavbar : EmployeeNavbar;
  const currentPath = usePathname().split("/").at(1);

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
              className={`navbutton ${
                currentPath === el.href.replace("/", "") ? "active" : ""
              }`}
            >
              <div className="nav-icon">
                {/* Render the appropriate icon based on the value */}
                {el.value === "Home" && <HomeIcon />}
                {el.value === "My-Courses" && <GraduationCapIcon />}
                {el.value === "Assessments" && <AssessmentIcon />}
                {el.value === "Certification" && <CertificateIcon />}
                {el.value === "Setting" && <SettingIcon />}
                {el.value === "Dashboard" && <HomeIcon />}
                {el.value === "Course Category" && <GraduationCapIcon />}
                {el.value === "Course" && <AssessmentIcon />}
                {el.value === "Notification" && <CertificateIcon />}
                {el.value === "Settings" && <SettingIcon />}
              </div>
              <div className="nav-text">{el.value}</div>
            </Link>
          ))}

          {/* <Link
            href="/home"
            className={`navbutton ${currentPath === "home" ? "active" : ""}`}
          >
            <HomeIcon />
            Home
          </Link>
          <Link
            href="/my-courses"
            className={`navbutton ${
              currentPath === "my-courses" ? "active" : ""
            }`}
          >
            <GraduationCapIcon />
            My Courses
          </Link>
          <Link
            href="/assessments"
            className={`navbutton ${
              currentPath === "assessments" ? "active" : ""
            }`}
          >
            <AssessmentIcon />
            Assessments
          </Link>
          <Link
            href="/certification"
            className={`navbutton ${
              currentPath === "certification" ? "active" : ""
            }`}
          >
            <CertificateIcon />
            Certification
          </Link>

          <Link
            href="/settings"
            className={`navbutton ${
              currentPath === "settings" ? "active" : ""
            }`}
          >
            <SettingIcon />
            Settings
          </Link> */}
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
