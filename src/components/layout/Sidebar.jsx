import React from "react";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Compass,
  Users,
  FileCheck,
  Calendar,
  User,
  ShieldCheck,
  BarChart3,
  LogOut,
  Terminal,
  DollarSign,
  Layers,
} from "lucide-react";

export const Sidebar = ({ activeTab, setActiveTab }) => {
  const { user, logout, selectedRole, switchRole } = useApp();

  const role = user?.role ? user.role.toUpperCase() : selectedRole.toUpperCase();

  const studentLinks = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "explore", label: "Explore Clubs", icon: Compass },
    { id: "my-clubs", label: "My Clubs", icon: Users },
    { id: "my-applications", label: "My Applications", icon: FileCheck },
    { id: "events", label: "Campus Events", icon: Calendar },
    { id: "profile", label: "My Profile", icon: User },
  ];

  const leadLinks = [
    { id: "lead-dashboard", label: "Lead Dashboard", icon: LayoutDashboard },
    { id: "manage-club", label: "Manage Club", icon: Layers },
    { id: "review-applications", label: "Applications", icon: FileCheck },
    { id: "member-roster", label: "Member Roster", icon: Users },
    { id: "event-proposals", label: "Event Proposals", icon: Calendar },
    { id: "club-analytics", label: "Club Analytics", icon: BarChart3 },
  ];

  const dswLinks = [
    { id: "dsw-dashboard", label: "DSW Dashboard", icon: LayoutDashboard },
    { id: "global-clubs", label: "Global Directory", icon: ShieldCheck },
    { id: "campus-analytics", label: "Campus Analytics", icon: BarChart3 },
    { id: "budget-approvals", label: "Budget Approvals", icon: DollarSign },
  ];

  let navLinks = studentLinks;
  if (role === "CLUB_HEAD" || role === "MENTOR" || selectedRole === "president") {
    navLinks = leadLinks;
  } else if (role === "DSW" || selectedRole === "dsw") {
    navLinks = dswLinks;
  }

  return (
    <aside
      style={{
        width: "260px",
        background: "#0F172A",
        color: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: "24px 16px",
        borderRight: "1px solid #1E293B",
        position: "sticky",
        top: 0,
      }}
    >
      <div>
        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 12px 24px 12px",
            borderBottom: "1px solid #1E293B",
            marginBottom: "24px",
            cursor: "pointer",
          }}
          onClick={() => setActiveTab(navLinks[0].id)}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.4)",
            }}
          >
            <Terminal size={20} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ fontSize: "18px", fontWeight: "700", letterSpacing: "-0.5px", margin: 0 }}>
              CommandLine
            </h2>
            <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "500" }}>
              University Portal
            </span>
          </div>
        </div>

        {/* Role Badge indicator */}
        <div
          style={{
            background: "rgba(79, 70, 229, 0.15)",
            border: "1px solid rgba(99, 102, 241, 0.3)",
            borderRadius: "8px",
            padding: "8px 12px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "11px", color: "#818CF8", fontWeight: "600", textTransform: "uppercase" }}>
            Role: {role}
          </span>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "none",
                  background: isActive
                    ? "linear-gradient(90deg, rgba(79, 70, 229, 0.25) 0%, rgba(59, 130, 246, 0.1) 100%)"
                    : "transparent",
                  color: isActive ? "#818CF8" : "#94A3B8",
                  fontWeight: isActive ? "600" : "500",
                  fontSize: "14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  borderLeft: isActive ? "3px solid #6366F1" : "3px solid transparent",
                }}
              >
                <Icon size={18} color={isActive ? "#818CF8" : "#94A3B8"} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Footer & Logout */}
      <div style={{ borderTop: "1px solid #1E293B", paddingTop: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#334155",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "14px",
              color: "#38BDF8",
            }}
          >
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#F8FAFC",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.name || "Guest User"}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "#64748B",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user?.email || "guest@gla.ac.in"}
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 12px",
            borderRadius: "6px",
            background: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.2)",
            color: "#FCA5A5",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          <LogOut size={16} />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};
