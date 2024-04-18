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
    selectedSuggestionIndex,
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
        {filteredSuggestions.length > 0 && (
          <div className="dashboard-resultBox">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={
                  "dashboard-suggestion " +
                  (index === selectedSuggestionIndex
                    ? "dashboard-selected"
                    : "")
                }
                onClick={() => handleSuggestionClick(index, suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
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
