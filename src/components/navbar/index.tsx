"use client";
import "./style.css";

import { FunctionComponent } from "react";
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
import HeaderNav from "@/types/sample";

interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = ({}) => {
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
        {/* {EmployeeNavbar.map((el, i) => {
          return <HeaderNav key={i} value={el.value} href={el.href} />;
        })} */}
        <div className="navbar-links">
          {EmployeeNavbar.map((el, i) => (
            <Link
              key={i}
              href={el.href}
              className={`navbutton ${
                currentPath === el.href.replace("/", "") ? "active" : ""
              }`}
            >
              {el.value === "Home" && <HomeIcon />}
              {el.value === "My Courses" && <GraduationCapIcon />}
              {el.value === "Assessments" && <AssessmentIcon />}
              {el.value === "Certification" && <CertificateIcon />}
              {el.value === "Settings" && <SettingIcon />}

              {el.value}
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
