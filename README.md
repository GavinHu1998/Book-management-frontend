# 📚 Library Management SPA — Project Proposal

## 1. Project Overview  
This project is a **Single Page Application (SPA)** built with **React**, designed for managing a digital library. It provides users with functionalities to browse, search, add, edit, and delete books through a user-friendly interface. Role-based access control is implemented to ensure that only administrators can perform sensitive actions.

---

## 2. Features

### 🧾 Book Browsing & Filtering
- Displays a list of books retrieved from a backend API.
- Responsive grid layout for different screen sizes.
- Built-in **search** by title, author, or publication date.

### 🔍 Book Detail & Edit
- View detailed information of each book.
- Authenticated admins can **edit or delete** book entries.
- Editable form fields are only enabled for logged-in admins.

### ➕ Add New Books
- Admins can add new books via a dedicated form.
- Includes form validation and toast-style user feedback.

### 🔐 Authentication
- Simple login form for admin authentication.
- Token-based auth stored in `localStorage`.
- Navbar adapts based on login status.

### 🔁 Routing
- Handled by `react-router-dom`:
  - `/books` — Book list
  - `/books/:id` — Book details/edit page
  - `/addbooks` — Book creation (admin only)
  - `/login` — Login page
  - `/` — Redirects to `/books`

---

## 3. Tech Stack

| Technology     | Description                        |
|----------------|------------------------------------|
| React          | Front-end library                  |
| Tailwind CSS   | Utility-first CSS framework        |
| React Router   | Client-side routing                |
| Fetch API      | REST API interaction               |
| Node.js Backend| Expected at `http://localhost:7000`|
| LocalStorage   | Token management                   |

---

## 4. User Roles & Permissions

| Role     | Capabilities                                |
|----------|---------------------------------------------|
| Visitor  | View and search books                       |
| Admin    | Add, edit, and delete book records          |

---

## 5. UI Highlights

- Minimalist card-based book layout.
- Blurry glassmorphism effect on login page.
- Toast messages for login and CRUD actions.
- Icons and navigation with conditional rendering.

---

## 6. Video Demo

A quick walkthrough video of the project is available here:  
🎥 [Watch Demo on Google Drive](https://drive.google.com/file/d/1EsHAeRj18W2y0YOMdMHZmv8Zqr_ce2Xl/view?usp=sharing)


