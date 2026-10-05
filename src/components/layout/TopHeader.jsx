import React from "react";
import { useApp } from "../../context/AppContext";
import { Bell, ShieldCheck, LogOut } from "lucide-react";

export const TopHeader = ({ activeTabTitle = "Dashboard" }) => {
  const { user, logout } = useApp();

  const role = (user?.role || "STUDENT").toUpperCase();

  const roleBadgeStyles = {
    STUDENT: { bg: "#EEF2FF", text: "#4F46E5", border: "#C7D2FE" },
    CLUB_HEAD: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A" },
    MENTOR: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A" },
    DSW: { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
  };

  const currentBadge = roleBadgeStyles[role] || roleBadgeStyles.STUDENT;

  return (
    <header
      style={{
        height: "64px",
        background: "#FFFFFF",
        borderBottom: "1px solid #E2E8F0",
        padding: "0 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Active Page Title */}
      <div>
        <h1 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
          {activeTabTitle}
        </h1>
      </div>

      {/* Right Header Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Official Database RBAC Role Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "20px",
            background: currentBadge.bg,
            border: `1px solid ${currentBadge.border}`,
            fontSize: "12px",
            fontWeight: "700",
            color: currentBadge.text,
          }}
        >
          <ShieldCheck size={16} />
          <span>DATABASE ROLE: {role}</span>
        </div>

        {/* Notifications Icon */}
        <div
          style={{
            position: "relative",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Bell size={18} color="#64748B" />
          <span
            style={{
              position: "absolute",
              top: "6px",
              right: "6px",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#EF4444",
            }}
          />
        </div>

        {/* User Profile Avatar & Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
              color: "#FFFFFF",
              fontWeight: "700",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <div style={{ fontSize: "13px", fontWeight: "600", color: "#0F172A" }}>
            {user?.name || "User"}
          </div>
        </div>

        {/* Quick Logout Button */}
        <button
          onClick={logout}
          title="Log Out to Landing Page"
          style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#DC2626",
            padding: "6px 12px",
            borderRadius: "8px",
            fontSize: "12px",
            fontWeight: "600",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <LogOut size={14} />
          <span>Exit</span>
        </button>
      </div>
    </header>
  );
};
