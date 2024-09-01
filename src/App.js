import React, { useState } from "react";
import Autocomplete from "./Autocomplete";
import Card from "./Card";
import data from "./data.json";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  const handleInputChange = (value) => {
    setQuery(value);

    if (value.trim() !== "") {
      const results = data.summaries
        .map((item) => ({
          ...item,
          count:
            item.summary.toLowerCase().split(value.toLowerCase()).length - 1,
        }))
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count);

      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (id) => {
    const book = data.summaries.find((item) => item.id === id);
    const author = data.authors.find((auth) => auth.book_id === id);

    if (book) {
      setSelectedBooks((prevBooks) => [
        ...prevBooks,
        {
          id: book.id,
          title: data.titles[book.id],
          summary: book.summary,
          author: author?.author || "Unknown",
        },
      ]);
      setQuery("");
      setSuggestions([]);
    }
  };

  return (
    <div className="app-container">
      <h1>Book Search</h1>
      <Autocomplete
        query={query}
        onInputChange={handleInputChange}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionClick}
      />
      <div className="cards-container">
        {selectedBooks.map((book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default App;
