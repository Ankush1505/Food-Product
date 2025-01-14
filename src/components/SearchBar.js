import React, { useState } from "react";

function SearchBar({ onSearch, placeholder }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!term.trim()) return;
    onSearch(term);
    setTerm("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit" >Search</button>
    </form>
  );
}

export default SearchBar;
