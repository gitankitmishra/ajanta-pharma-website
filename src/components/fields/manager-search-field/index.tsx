import { SearchIcon } from "@/components/icons/search-icon";
import { FunctionComponent } from "react";
import "./style.css"

interface ManagerSearchFieldProps {}

const ManagerSearchField: FunctionComponent<ManagerSearchFieldProps> = () => {
  return (
    <div>
      <div className="manager-search-container">
        <input
          type="text"
          placeholder="Search..."
          name="search"
          className="manager-search-input-field"
        />

        <div className="manager-search-icon">
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default ManagerSearchField;
