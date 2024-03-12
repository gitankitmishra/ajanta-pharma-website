"use client";
import { FC, FunctionComponent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface HeaderNavProps {
  value: string;
  href: string;
}

const HeaderNav: FC<HeaderNavProps> = ({ value, href }) => {
  const route: string = usePathname();
  return (
    <div>
      <Link href={href}>{value}</Link>
      {/* <div style={href === route ? { display: "flex" } : { display: "none" }} /> */}
    </div>
  );
};

export default HeaderNav;
