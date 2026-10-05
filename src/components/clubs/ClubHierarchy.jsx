import React from "react";
import { ShieldCheck, UserCheck, Users, Crown, ChevronDown } from "lucide-react";

export const ClubHierarchy = ({ mentorName, headName, officers = [], membersCount = 0 }) => {
  return (
    <div
      style={{
        background: "#F8FAFC",
        borderRadius: "14px",
        border: "1px solid #E2E8F0",
        padding: "20px",
      }}
    >
      <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>
        Leadership & Governance Hierarchy
      </h4>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
        {/* Tier 1: Institutional DSW Oversight */}
        <div
          style={{
            background: "#1E1B4B",
            color: "#FFFFFF",
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(30, 27, 75, 0.2)",
          }}
        >
          <ShieldCheck size={16} color="#818CF8" />
          <span>DSW Office (University Governance)</span>
        </div>

        <ChevronDown size={18} color="#94A3B8" />

        {/* Tier 2: Faculty Mentor */}
        <div
          style={{
            background: "#EEF2FF",
            border: "1.5px solid #C7D2FE",
            color: "#3730A3",
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UserCheck size={16} color="#4F46E5" />
          <span>Faculty Mentor: {mentorName || "Prof. Dr. Campus Advisor"}</span>
        </div>

        <ChevronDown size={18} color="#94A3B8" />

        {/* Tier 3: Club Head / President */}
        <div
          style={{
            background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "10px",
            fontSize: "14px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
          }}
        >
          <Crown size={18} color="#FDE047" />
          <span>Club President: {headName || "Student Lead"}</span>
        </div>

        <ChevronDown size={18} color="#94A3B8" />

        {/* Tier 4: Members */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid #E2E8F0",
            color: "#475569",
            padding: "10px 18px",
            borderRadius: "10px",
            fontSize: "13px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Users size={16} color="#64748B" />
          <span>Club Active Roster ({membersCount} Student Members)</span>
        </div>
      </div>
    </div>
  );
};
