import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // Temporary registration simulation
    register({ name, email });
    toast.success("Registration successful");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Register
        </button>
      </form>
      <p className="mt-2 text-sm">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
}
