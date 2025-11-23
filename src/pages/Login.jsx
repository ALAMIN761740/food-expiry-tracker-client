import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth } from "../../firebase.config.js";
import { signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email & password required");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful");
      navigate("/profile");
    } catch (error) {
      toast.error("Invalid credentials");
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google Login Successful");
      navigate("/profile");
    } catch (error) {
      toast.error("Google Login Failed");
    }
  };

  // Facebook Login
  const handleFacebookLogin = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Facebook Login Successful");
      navigate("/profile");
    } catch (error) {
      toast.error("Facebook Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_4px_20px_rgba(56,189,248,0.35)]">
      <h1 className="text-2xl font-bold mb-4 text-sky-600 dark:text-white">Login</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="input input-bordered w-full bg-white dark:bg-gray-800" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input input-bordered w-full bg-white dark:bg-gray-800" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn bg-sky-600 hover:bg-sky-700 text-white w-full rounded-xl">Login</button>
      </form>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={handleGoogleLogin} className="btn btn-outline w-full">Login with Google</button>
        <button onClick={handleFacebookLogin} className="btn btn-outline w-full">Login with Facebook</button>
      </div>

      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        Don't have an account? <Link to="/register" className="text-sky-600 font-semibold">Register</Link>
      </p>
    </div>
  );
}
