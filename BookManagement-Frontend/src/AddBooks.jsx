import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

function AddBooks() {
  const [bookData, setBookData] = useState({
    coverImage: "",
    title: "",
    author: "",
    publicationDate: "",
    description: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isAdmin = localStorage.getItem("authToken");
    if (!isAdmin) {
      setToastMessage("Access denied: Admins only.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    if (!bookData.title || !bookData.author || !bookData.coverImage) {
      setToastMessage("Please fill in all required fields.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:7000/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookData),
      });

      if (response.status === 201) {
        const data = await response.json();
        setToastMessage("Book added successfully!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 2000);
      } else {
        if (response.status === 401) {
          setToastMessage("Access denied: Invalid credentials. Please log in as an admin.");
        } else if (response.status === 400) {
          setToastMessage("Bad request: Please check the input fields.");
        } else {
          const errorData = await response.json();
          setToastMessage(`Error adding book: ${errorData.message || "Unknown error"}`);
        }
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (error) {
      setToastMessage(`Error adding book: ${error.message}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div>
      {showToast && <Toast message={toastMessage} />}
      <div className="w-[950px] h-[650px] mx-auto flex border p-6 space-x-4 rounded-2xl bg-white shadow-lg mt-4">
        <div className="w-2/5 h-full">
          <input
            type="text"
            placeholder="Enter coverImage URL here"
            name="coverImage"
            value={bookData.coverImage}
            onChange={handleChange}
            className="w-full h-full border border-blue-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-3/5 h-full flex flex-col justify-between">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Enter book title"
              name="title"
              value={bookData.title}
              onChange={handleChange}
              className="w-full h-10 border border-blue-500 rounded-md px-2"
            />
            <input
              type="text"
              placeholder="Enter author name"
              name="author"
              value={bookData.author}
              onChange={handleChange}
              className="w-full h-10 border border-blue-500 rounded-md px-2"
            />
            <input
              type="date"
              name="publicationDate"
              
              value={bookData.publicationDate}
              onChange={handleChange}
              className="w-full h-10 border border-blue-500 rounded-md px-2"
            />
            <textarea
              placeholder="Enter book description"
              name="description"
              value={bookData.description}
              onChange={handleChange}
              className="w-full h-32 border border-blue-500 rounded-md px-2 max-h-40"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleSubmit}
              className="w-20 h-10 bg-blue-500 text-white rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBooks;
