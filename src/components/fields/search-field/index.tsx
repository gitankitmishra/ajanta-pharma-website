"use client";
import { SearchIcon } from "@/components/icons/search-icon";
import { FC, useEffect, useState } from "react";
import "./style.css";
import { BellIcon } from "@/components/icons/bell-icon";
import { ProfileIcon } from "@/components/icons/profile-icon";
import { usePathname, useRouter } from "next/navigation";
import { WhiteBellIcon } from "@/components/icons/whiteBellIcon";

interface SearchFieldSectionProps {}

const SearchFieldSection: FC<SearchFieldSectionProps> = () => {
  //context data

  const router = useRouter();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] =
    useState<number>(-1);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);

  // hide searchbar when /team-performance page is open
  const currentPath = usePathname();
  const hideSearch = currentPath === "/team-performance";

  const handleChange = () => {
    router.push("/notification");
    setClicked(!clicked);
  };
  useEffect(() => {
    const defaultSuggestions = [
      "BO1 - Business Etiquette",
      "BO2 - Corporate Grooming (Males)",
      "BO3 - Innovative Thinking",
      "BO4 - Problem Solving",
      "YouTuber",
      "YouTube Channel",
    ];
    setSuggestions(defaultSuggestions);
    setFilteredSuggestions(defaultSuggestions);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedSuggestionIndex(-1);

    if (value.trim() === "") {
      setFilteredSuggestions([]);
    } else {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex !== -1) {
      setSearchTerm(filteredSuggestions[selectedSuggestionIndex]);
      setSelectedSuggestionIndex(-1);
    }
  };

  const handleSuggestionClick = (index: number) => {
    setSearchTerm(filteredSuggestions[index]);
    setSelectedSuggestionIndex(-1);
  };

  return (
    <section className="search-field-main-section">
      {!hideSearch && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            name="search"
            className="search-input-field"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {isSearchFocused && (
            <div className="resultBox">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={
                    "suggestion " +
                    (index === selectedSuggestionIndex ? "selected" : "")
                  }
                  onClick={() => handleSuggestionClick(index)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
          <div className="search-icon">
            <SearchIcon />
          </div>
        </div>
      )}
      <div
        className={`bell-icon ${clicked ? "clicked" : ""}`}
        onClick={handleChange}
      >
        {clicked ? <WhiteBellIcon /> : <BellIcon />}
      </div>
      <div className="profile-icon">
        <ProfileIcon />
      </div>
    </section>
  );
};

export default SearchFieldSection;
