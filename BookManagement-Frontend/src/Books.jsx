import { useState, useEffect } from "react";
import { Book } from "./Book";
import SearchBar from "./SearchBar";

export function Books() {
  const [books, setBooks] = useState([]); 
  const [filteredBooks, setFilteredBooks] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    // Fetch books from the API
    fetch("http://localhost:7000/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data); 
        setFilteredBooks(data); 
        setLoading(false); 
      })
      .catch((err) => {
        setError(err.message); 
        setLoading(false); 
      });
  }, []); 

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full justify-center">
      <SearchBar books={books} setFilteredBooks={setFilteredBooks} />
      <div className="w-full flex justify-center">
        <div
          className="
                max-w-[1440px] 
                grid 
                sm:grid-cols-1 
                md:grid-cols-2 
                lg:grid-cols-3 
                xl:grid-cols-3 
                gap-4 mt-4 mx-5"
        >
          {filteredBooks.map((book) => (
            // Render filtered books
            <Book
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              description={book.description}
              publicationDate={book.publicationDate}
              coverImage={book.coverImage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
