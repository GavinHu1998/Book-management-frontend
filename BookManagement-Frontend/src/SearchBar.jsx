import React, { useState } from "react";

const SearchBar = ({ books, setFilteredBooks }) => {
  const [searchContext, setSearchContext] = useState(""); 
  const [searchTerm, setSearchTerm] = useState(""); 

  const handleContextChange = (e) => {
    setSearchContext(e.target.value);
    setSearchTerm(""); 
    setFilteredBooks(books); 
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (searchContext) {
      const results = books.filter((book) =>
        book[searchContext]?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredBooks(results);
    } else {
      setFilteredBooks(books); 
    }
  };

  return (
    <div className="flex w-full mt-5 gap-[1px]">
      <select
        id="search-context"
        value={searchContext}
        onChange={handleContextChange}
        className="h-12 w-48 px-4 ml-5 bg-white border-r border-gray-300 rounded-l-lg text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      >
        <option value="">All</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publicationDate">Publication Date</option>
      </select>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={
          searchContext ? `Search by ${searchContext}...` : "Select context to search"
        }
        className="h-12 w-full px-4 rounded-r-lg mr-5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;
