"use client";
import { SearchIcon } from "@/components/icons/search-icon";
import { FC, useContext, useState } from "react";
import "./style.css";
import { BellIcon } from "@/components/icons/bell-icon";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { CourseContext, CourseContextType } from "@/context/course_context";

interface AdminSearchFieldSectionProps {}

const AdminSearchFieldSection: FC<AdminSearchFieldSectionProps> = ({}) => {
  const {
    searchTerm,
    handleSearchData,
    filteredSuggestions,
    handleSuggestionClick,
  } = useContext(CourseContext) as CourseContextType;


  return (
    <section className="admin-search-field-main-section">
      <div className="admin-search-container">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          value={searchTerm}
          onChange={handleSearchData}
          className="admin-search-input-field"
        />
        {filteredSuggestions.length > 0 && (
          <div className="admin-resultBox">
            {filteredSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={
                  "admin-suggestion " +
                  (index === selectedSuggestionIndex ? "admin-selected" : "")
                }
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
        <div className="admin-search-icon">
          <SearchIcon />
        </div>
      </div>

      <div className="admin-profile-icon">
        <ProfileIcon />
      </div>
    </section>
  );
};

export default AdminSearchFieldSection;
