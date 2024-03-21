"use client";
import { FC, useState } from "react";
import "./style.css";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";

interface DasboardSearchFieldProps {}

const DasboardSearchField: FC<DasboardSearchFieldProps> = () => {
  return (
    <section className="dashboard-search-field-main-section">
      <div className="dashboard-search-container">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="dashboard-search-input-field"
        />
        <div className="dashboard-search-icon">
          <SearchIcon />
        </div>
      </div>
      <div className="dashboard-calendar-icon">
        <CalendarIcon />
      </div>
      <div className="dashboard-profile-icon">
        <ProfileIcon />
      </div>
    </section>
  );
};

export default DasboardSearchField;
