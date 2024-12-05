import React, { useState } from "react";
import LibraryImg from './assets/LibraryImg.jpg';
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useState({ username: "admin", password: "password123" });
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:7000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setToastMessage("Login successful.");
        } else if (data.message) {
          setToastMessage(data.message);
        }
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          navigate("/");
        }, 2000);
      } else if (response.status === 401) {
        setToastMessage("Invalid username or password");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (error) {
      setToastMessage("An error occurred. Please try again later.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };
  

  return (
    <div className="h-screen w-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${LibraryImg})`,
        }}
      ></div>
      <div className="w-96 bg-blue-700/30 backdrop-blur-lg rounded-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-96 p-8 shadow-lg rounded-2xl">
          <h1 className="text-2xl font-bold text-center mb-6 text-white">Sign In</h1>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={userInfo.username}
              onChange={handleChange}
              required
              className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={userInfo.password}
              onChange={handleChange}
              required
              className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
      {showToast && <Toast message={toastMessage} />}
    </div>
  );
};

export default LoginPage;
