import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 dark:bg-gray-900/80">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">Page Not Found</p>
      <Link to="/" className="btn bg-sky-500 text-white hover:bg-sky-600">Go Home</Link>
    </div>
  );
}
