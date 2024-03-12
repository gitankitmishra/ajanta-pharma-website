import { SearchIcon } from "@/components/icons/search-icon";
import { FC } from "react";
import "./style.css";
import { BellIcon } from "@/components/icons/bell-icon";
import { ProfileIcon } from "@/components/icons/profile-icon";

interface SearchFieldSectionProps {}

const SearchFieldSection: FC<SearchFieldSectionProps> = () => {
  return (
    <section className="search-field-main-section">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="search-input-field"
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
      <div className="bell-icon">
        <BellIcon />
      </div>
      <div className="profile-icon">
        <ProfileIcon/>
      </div>
    </section>
  );
};

export default SearchFieldSection;
