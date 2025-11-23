import React from "react";
import { useRoutes } from "react-router-dom";
import allRoutes from "./routes/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

export default function App() {
  const routing = useRoutes(allRoutes);

  return (
    <AuthProvider>
      <Navbar />
      <main className="min-h-[calc(100vh-160px)]">{routing}</main>
      <Footer />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}
