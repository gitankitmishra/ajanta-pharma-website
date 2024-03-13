import { SearchIcon } from "@/components/icons/search-icon";
import { FC } from "react";
import "./style.css";
import { BellIcon } from "@/components/icons/bell-icon";
import { ProfileIcon } from "@/components/icons/profile-icon";

interface AdminSearchFieldSectionProps {}

const AdminSearchFieldSection: FC<AdminSearchFieldSectionProps> = () => {
  return (
    <section className="admin-search-field-main-section">
      <div className="admin-search-container">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="admin-search-input-field"
        />
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
