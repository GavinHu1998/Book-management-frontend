import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Toast from "./Toast";

function ChangeBooks() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken"); 

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:7000/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
        } else {
          setToastMessage("Book not found");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        setToastMessage("Error fetching book details");
        setShowToast(true);
      }
    };

    fetchBook();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
      });

      if (response.ok) {
        const updatedBook = await response.json();
        setBook(updatedBook);
        setToastMessage("Book updated successfully!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        setToastMessage(`Error: ${errorData.message}`);
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Failed to update book. Please try again later.");
      setShowToast(true);
    }
  };
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:7000/books/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 204) {
        setToastMessage("Book deleted successfully!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/"); 
        }, 2000);
      } else if (response.status === 401) {
        setToastMessage("Unauthorized: Only admins can delete books");
        setShowToast(true);
      } else if (response.status === 404) {
        setToastMessage("Book not found");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        setToastMessage(`Error: ${errorData.message}`);
        setShowToast(true);
      }
    } catch (error) {
      setToastMessage("Failed to delete book. Please try again later.");
      setShowToast(true);
    }
  };
  const handleClick = () => {
    if (confirm) {
      handleDelete();
    } else {
      setConfirm(true);
    }
  };

  const handleReset = () => {
    setConfirm(false); 
  };
  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-[950px] h-[650px] mx-auto flex border p-6 space-x-4 rounded-2xl bg-white shadow-lg mt-4">
      <div className="w-2/5 h-full">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="w-3/5 h-full flex flex-col justify-between">
        <div className="space-y-4">
          <input
            readOnly={!token}
            type="text"
            name="title"
            placeholder="Title"
            value={book.title}
            onChange={handleInputChange}
            className="w-full h-10 border border-blue-500 rounded-md px-2"
          />
          <input
            readOnly={!token}
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={book.coverImage}
            onChange={handleInputChange}
            className="w-full h-10 border border-blue-500 rounded-md px-2"
          />
          <input
            readOnly={!token}
            type="text"
            name="author"
            placeholder="Author"
            value={book.author}
            onChange={handleInputChange}
            className="w-full h-10 border border-blue-500 rounded-md px-2"
          />
          <input
            readOnly={!token}
            type="date"
            name="publicationDate"
            value={book.publicationDate}
            onChange={handleInputChange}
            className="w-full h-10 border border-blue-500 rounded-md px-2"
          />
          <textarea
            readOnly={!token}
            name="description"
            placeholder="Description"
            value={book.description}
            onChange={handleInputChange}
            className="w-full h-32 border border-blue-500 rounded-md px-2 max-h-sm"
          />
        </div>

        {token && (
          <div className="flex justify-end space-x-4">
            <button className="px-3 py-2 bg-red-500 text-white rounded-md"
              onClick={handleClick}
              onMouseLeave={handleReset}>
              {confirm ? "Click to Confirm" : "Delete"}
            </button>
            <button
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        )}
        {showToast && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}

export default ChangeBooks;