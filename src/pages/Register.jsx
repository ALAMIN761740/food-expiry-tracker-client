import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auth } from "../../firebase.config.js";
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: name });

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  // Google Signup/Login
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google Signup/Login Successful");
      navigate("/profile");
    } catch (error) {
      toast.error("Google Signup/Login Failed");
    }
  };

  // Facebook Signup/Login
  const handleFacebookSignup = async () => {
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Facebook Signup/Login Successful");
      navigate("/profile");
    } catch (error) {
      toast.error("Facebook Signup/Login Failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_4px_20px_rgba(56,189,248,0.35)]">
      <h1 className="text-2xl font-bold mb-4 text-sky-600 dark:text-white">Register</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" className="input input-bordered w-full bg-white dark:bg-gray-800" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="input input-bordered w-full bg-white dark:bg-gray-800" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" className="input input-bordered w-full bg-white dark:bg-gray-800" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="btn bg-sky-600 hover:bg-sky-700 text-white w-full rounded-xl">Register</button>
      </form>

      <div className="mt-4 flex flex-col gap-2">
        <button onClick={handleGoogleSignup} className="btn btn-outline w-full">Sign up with Google</button>
        <button onClick={handleFacebookSignup} className="btn btn-outline w-full">Sign up with Facebook</button>
      </div>

      <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        Already have an account? <Link to="/login" className="text-sky-600 font-semibold">Login</Link>
      </p>
    </div>
  );
}
