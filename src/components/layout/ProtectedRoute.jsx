import React from "react";
import { useApp } from "../../context/AppContext";

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, token, setIsAuthModalOpen } = useApp();

  if (!token || !user) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", color: "#1E293B", marginBottom: "12px" }}>
          Authentication Required
        </h2>
        <p style={{ color: "#64748B", marginBottom: "24px" }}>
          Please log in to access this portal workspace.
        </p>
        <button
          onClick={() => setIsAuthModalOpen(true)}
          style={{
            padding: "10px 24px",
            background: "#4F46E5",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Open Login Modal
        </button>
      </div>
    );
  }

  const userRole = (user.role || "STUDENT").toUpperCase();
  const normalizedAllowed = allowedRoles.map((r) => r.toUpperCase());

  if (normalizedAllowed.length > 0 && !normalizedAllowed.includes(userRole)) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "70vh",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", color: "#EF4444", marginBottom: "12px" }}>
          Access Denied
        </h2>
        <p style={{ color: "#64748B" }}>
          Your role (<strong>{userRole}</strong>) does not have authorization to view this section.
        </p>
      </div>
    );
  }

  return children;
};
