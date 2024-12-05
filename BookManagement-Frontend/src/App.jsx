import "./App.css";
import { Navbar } from "./NavigationBar";
import { Books } from "./Books";
import AddBooks from "./AddBooks";
import LoginPage from "./LoginPage";
import ChangeBooks from "./ChangeBooks";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="justify-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/books" />} />
          <Route path="/books" element={<Books />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/addbooks" element={<AddBooks />} />
          <Route path="/books/:id" element={<ChangeBooks />} />
        </Routes>
      </div>
    </Router>
  );
}
