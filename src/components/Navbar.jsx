import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthProvider.jsx"; 
import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config.js";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => logout())
      .catch((err) => console.error(err));
  };

  const navLinks = (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/services"
        className={({ isActive }) =>
          isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
        }
      >
        Services
      </NavLink>

      {user && (
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "text-blue-600 font-semibold" : "hover:text-blue-500"
          }
        >
          My Profile
        </NavLink>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-200 px-5 shadow-sm">
      <div className="navbar-start">
        <a className="text-xl font-bold text-blue-600">My App</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="flex gap-6 text-lg">{navLinks}</div>
      </div>

      <div className="navbar-end">

        {/* যদি user লগ-ইন থাকে */}
        {user ? (
          <div className="flex items-center gap-3">

            {/* User Photo */}
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="profile"
                className="w-9 h-9 rounded-full border"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-blue-300 flex items-center justify-center text-white font-semibold">
                {user.email[0].toUpperCase()}
              </div>
            )}

            {/* User Name / Email */}
            <span className="text-gray-700 font-medium hidden sm:block">
              {user.displayName || user.email}
            </span>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          /* লগ-ইন না থাকলে */
          <Link to="/login" className="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
