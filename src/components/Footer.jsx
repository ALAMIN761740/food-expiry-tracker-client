import React from "react";

const Footer = () => (
  <footer className="bg-green-50 border-t border-green-200 p-6 text-center text-green-800">
    &copy; {new Date().getFullYear()} FoodTracker. All rights reserved.
  </footer>
);

export default Footer;
