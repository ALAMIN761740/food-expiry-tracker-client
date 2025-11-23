import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg px-6">
      {/* Left */}
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-white">
          FoodTracker
        </Link>
      </div>

      {/* Center */}
      <div className="navbar-center hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-3">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/fridge">Fridge</Link></li>
          {user && <li><Link to="/add-food">Add Food</Link></li>}
          {user && <li><Link to="/my-items">My Items</Link></li>}
        </ul>
      </div>

      {/* Right */}
      <div className="navbar-end">
        {!user && (
          <>
            <Link to="/login" className="btn btn-outline btn-sm mr-2">Login</Link>
            <Link to="/register" className="btn btn-outline btn-sm">Register</Link>
          </>
        )}
        {user && (
          <div className="flex items-center gap-2">
            <span className="font-medium">{user.name || user.email}</span>
            <button onClick={logout} className="btn btn-sm btn-error">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}
