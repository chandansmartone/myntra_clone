import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate("/products", { state: { q: query } });
      setQuery("");
    }
  };

  return (
    <>
      <div className="search-box">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search for products, brands and more..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>
    </>
  );
};

export default Search;
