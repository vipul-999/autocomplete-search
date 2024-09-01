import React from "react";
import data from "./data.json";

const Autocomplete = ({
  query,
  onInputChange = () => {},
  suggestions = [],
  onSuggestionClick,
}) => {
  return (
    <div className="autocomplete-container" data-testid="autocomplete-container">
      <input
        type="text"
        value={query}
        onChange={(e) => onInputChange(e.target.value)}
        placeholder="Search for books..."
      />

      <ul
        className="suggestions-list"
        style={suggestions?.length > 0 ? {} : { display: "none" }}
      >
        {suggestions.map((item) => (
          <li key={item.id} onClick={() => onSuggestionClick(item.id)}>
            {data.titles[item.id]} {/* Display the book title */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Autocomplete;
