import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! Page Not Found</p>
      <Link to="/" className="btn btn-primary">
        Go Back Home
      </Link>
    </div>
  );
}
