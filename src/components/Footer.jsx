import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white/30 dark:bg-gray-900/30 shadow-xl rounded-2xl py-8 px-6 backdrop-blur-md mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-sky-700 dark:text-white">FoodTracker</h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">Manage your food and reduce waste efficiently</p>
        </div>

        <div className="flex gap-4 text-gray-700 dark:text-gray-300">
          <a href="#" className="hover:text-sky-500">About</a>
          <a href="#" className="hover:text-sky-500">Privacy</a>
          <a href="#" className="hover:text-sky-500">Contact</a>
        </div>
      </div>

      <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">© 2025 FoodTracker. All rights reserved.</p>
    </footer>
  );
}
