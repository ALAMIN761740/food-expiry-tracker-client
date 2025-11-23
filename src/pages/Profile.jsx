import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-[0_4px_20px_rgba(56,189,248,0.35)]">
      <h1 className="text-3xl font-bold text-sky-600 dark:text-white mb-4">
        My Profile
      </h1>

      <div className="space-y-3 text-lg text-gray-700 dark:text-gray-300">
        <p><strong>Name:</strong> {user?.name || "No Name"}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Joined:</strong> {user?.createdAt || "N/A"}</p>
      </div>
    </div>
  );
}
