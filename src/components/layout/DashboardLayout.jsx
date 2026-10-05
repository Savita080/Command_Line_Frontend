import React from "react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

export const DashboardLayout = ({ children, activeTab, setActiveTab, activeTabTitle }) => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <TopHeader activeTabTitle={activeTabTitle} />
        <main style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
};
