import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config.js";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => logout())
      .catch((err) => console.error(err));
    setOpen(false);
  };

  // Navigation links
  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 border-b-2 border-sky-600 pb-1"
            : "hover:text-sky-600"
        }
        onClick={() => setOpen(false)}
      >
        Home
      </NavLink>

      <NavLink
        to="/fridge"
        className={({ isActive }) =>
          isActive
            ? "text-sky-600 border-b-2 border-sky-600 pb-1"
            : "hover:text-sky-600"
        }
        onClick={() => setOpen(false)}
      >
        Fridge
      </NavLink>

      {user && (
        <>
          <NavLink
            to="/add-food"
            className={({ isActive }) =>
              isActive
                ? "text-sky-600 border-b-2 border-sky-600 pb-1"
                : "hover:text-sky-600"
            }
            onClick={() => setOpen(false)}
          >
            Add Food
          </NavLink>

          <NavLink
            to="/my-items"
            className={({ isActive }) =>
              isActive
                ? "text-sky-600 border-b-2 border-sky-600 pb-1"
                : "hover:text-sky-600"
            }
            onClick={() => setOpen(false)}
          >
            My Items
          </NavLink>
        </>
      )}
    </>
  );

  return (
    <div className="px-4 md:px-10 mt-4 mb-6 sticky top-0 z-50">
      <div className="bg-white/30 dark:bg-gray-900/30 backdrop-blur-md rounded-2xl shadow-[0_4px_20px_rgba(56,189,248,0.35)] py-6 px-6 flex justify-between items-center">

        {/* Logo */}
        <Link
          to={user ? "/profile" : "/"}
          className="text-2xl font-bold text-sky-700 dark:text-white hover:text-sky-900 transition"
        >
          FoodTracker
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-sky-700 dark:text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex gap-6 font-medium text-sky-700 dark:text-white">
          {navLinks}
        </ul>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="btn btn-sm rounded-full bg-white dark:bg-slate-600"
          >
            {isDark ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
          </button>

          {/* User Section */}
          {!user ? (
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
          ) : (
            <Link
              to="/profile"
              className="btn btn-sm bg-sky-500 text-white hover:bg-sky-600 rounded-xl flex items-center gap-2"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="profile"
                  className="w-6 h-6 rounded-full border"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-300 flex items-center justify-center text-white font-semibold text-sm">
                  {user.email[0].toUpperCase()}
                </div>
              )}
              Profile
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden mt-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-5 shadow-[0_4px_20px_rgba(56,189,248,0.35)]">
          <ul className="flex flex-col gap-4 text-sky-700 dark:text-white font-medium">
            {navLinks}
          </ul>

          {/* Mobile Login/Register/Logout */}
          <div className="mt-4 flex flex-col gap-3">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="btn btn-sm bg-sky-500 text-white rounded-xl hover:bg-sky-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setOpen(false)}
                  className="btn btn-sm bg-sky-500 text-white rounded-xl hover:bg-sky-600"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
