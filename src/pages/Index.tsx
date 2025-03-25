
import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardHome from "@/components/dashboard/DashboardHome";
import AppHealth from "@/components/dashboard/AppHealth";

const Index: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/app-health" element={<AppHealth />} />
    </Routes>
  );
};

export default Index;
