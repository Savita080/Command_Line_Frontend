import React from "react";
import { useApp } from "../../context/AppContext";
import { User, Award, ShieldCheck, X } from "lucide-react";

export const RoleSelectModal = ({ isOpen, onClose, onSelectRole }) => {
  const { switchRole } = useApp();

  if (!isOpen) return null;

  const handleSelect = (role) => {
    switchRole(role);
    if (onSelectRole) onSelectRole(role);
    onClose();
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          maxWidth: "460px",
          width: "100%",
          padding: "28px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#F1F5F9",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={18} />
        </button>

        <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Select Platform Access Role
        </h3>
        <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 20px 0" }}>
          Choose your stakeholder persona to enter the tailored portal dashboard.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button
            onClick={() => handleSelect("student")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px",
              borderRadius: "12px",
              border: "1.5px solid #E2E8F0",
              background: "#FFFFFF",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <User size={22} color="#4F46E5" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A" }}>Student Portal</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>Discover clubs, submit applications & RSVP events</div>
            </div>
          </button>

          <button
            onClick={() => handleSelect("president")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px",
              borderRadius: "12px",
              border: "1.5px solid #E2E8F0",
              background: "#FFFFFF",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#FEF3C7", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Award size={22} color="#D97706" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A" }}>Club Lead / Mentor</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>Manage club rosters, review applicants & propose events</div>
            </div>
          </button>

          <button
            onClick={() => handleSelect("dsw")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "16px",
              borderRadius: "12px",
              border: "1.5px solid #E2E8F0",
              background: "#FFFFFF",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ShieldCheck size={22} color="#059669" />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A" }}>DSW / University Admin</div>
              <div style={{ fontSize: "12px", color: "#64748B" }}>Campus analytics, global club registry & budget approvals</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
