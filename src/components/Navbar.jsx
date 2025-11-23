import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="px-4 md:px-10 mt-4 mb-6 sticky top-0 z-50">
      <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl shadow-2xl py-6 px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-sky-700 dark:text-white hover:text-sky-900 transition"
        >
          FoodTracker
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 font-medium text-sky-700 dark:text-white">
          <li><Link className="hover:text-sky-600" to="/">Home</Link></li>
          <li><Link className="hover:text-sky-600" to="/fridge">Fridge</Link></li>
          {user && <li><Link className="hover:text-sky-600" to="/add-food">Add Food</Link></li>}
          {user && <li><Link className="hover:text-sky-600" to="/my-items">My Items</Link></li>}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="btn btn-sm rounded-full bg-white dark:bg-slate-600"
          >
            {isDark ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
          </button>

          {!user && (
            <>
              <Link
                to="/login"
                className="btn btn-sm border-sky-300 dark:border-white text-sky-700 dark:text-white hover:bg-sky-200 dark:hover:bg-slate-600 rounded-xl"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm border-sky-300 dark:border-white text-sky-700 dark:text-white hover:bg-sky-200 dark:hover:bg-slate-600 rounded-xl"
              >
                Register
              </Link>
            </>
          )}

          {user && (
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sky-700 dark:text-white">{user.name || user.email}</span>
              <button
                onClick={logout}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600 rounded-xl"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
