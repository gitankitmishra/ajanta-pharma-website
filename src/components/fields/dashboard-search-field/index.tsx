"use client";
import { FC, useContext, useState } from "react";
import "./style.css";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { SearchIcon } from "@/components/icons/search-icon";
import { CalendarIcon } from "@/components/icons/calendar-icon";
import { CourseContext, CourseContextType } from "@/context/course_context";

interface DasboardSearchFieldProps {}

const DasboardSearchField: FC<DasboardSearchFieldProps> = () => {
  const {
    searchTerm,
    handleSearchData,
    filteredSuggestions,
    handleSuggestionClick,
  } = useContext(CourseContext) as CourseContextType;
  return (
    <section className="dashboard-search-field-main-section">
      <div className="dashboard-search-container">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchTerm}
          onChange={handleSearchData}
          className="dashboard-search-input-field"
        />
        <div className="dashboard-search-icon">
          <SearchIcon />
        </div>
        {filteredSuggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
