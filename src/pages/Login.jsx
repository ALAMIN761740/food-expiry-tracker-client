import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email & password required");
      return;
    }
    // Temporary login simulation
    login({ email });
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
          Login
        </button>
      </form>
      <p className="mt-2 text-sm">
        Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
      </p>
    </div>
  );
}
