import React, { FC } from "react";
import Link from "next/link";
import "./style.css";

interface BreadcrumbItem {
  label: string;
  href: string;
  isActive?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div aria-label="breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbItem">
            <Link
              href={item.href}
              className={item.isActive ? "activeBreadcrumb" : ""}
            >
              <span>{item.label}</span>
            </Link>
            {index !== items.length - 1 && (
              <span className="breadcrumbSeparator"> / </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;
