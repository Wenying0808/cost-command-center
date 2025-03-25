
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-finops-gray-50 to-finops-gray-100 dark:from-finops-gray-900 dark:to-finops-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-6 animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
