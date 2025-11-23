import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import allRoutes from "./routes/routes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";

function AppRoutes() {
  const routing = useRoutes(allRoutes);
  return routing;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <main className="min-h-[calc(100vh-160px)]">
          <AppRoutes />
        </main>
        <Footer />
        <Toaster position="top-right" />
      </AuthProvider>
    </BrowserRouter>
  );
}
