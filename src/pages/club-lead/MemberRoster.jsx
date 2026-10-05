import React, { useState } from "react";
import { Users, UserPlus, ShieldCheck, Trash2, Search } from "lucide-react";
import { Button } from "../../components/common/Button";

export const MemberRoster = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: "Aarav Patel",
      email: "lead.tech@university.edu",
      studentId: "2023CS0142",
      branch: "Computer Science",
      year: 3,
      role: "CLUB_HEAD",
      joinedDate: "2024-08-10",
    },
    {
      id: 2,
      name: "Pooja Sharma",
      email: "student1@university.edu",
      studentId: "2024EC0089",
      branch: "Electronics",
      year: 2,
      role: "STUDENT",
      joinedDate: "2025-08-20",
    },
    {
      id: 3,
      name: "Kabir Singh",
      email: "kabir.s@university.edu",
      studentId: "2023IT0099",
      branch: "Information Tech",
      year: 3,
      role: "STUDENT",
      joinedDate: "2025-01-15",
    },
  ]);
  const [search, setSearch] = useState("");

  const filteredMembers = members.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.studentId.toLowerCase().includes(search.toLowerCase())
  );

  const handleRemoveMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Centralized Club Member Roster
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          View all active student members in your club, update officer designations, or manage member removal.
        </p>
      </div>

      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
          overflow: "hidden",
        }}
      >
        {/* Search Bar */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: "8px",
              padding: "0 12px",
              maxWidth: "360px",
            }}
          >
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search member by name, roll, or branch..."
              style={{
                width: "100%",
                padding: "8px 0",
                border: "none",
                background: "transparent",
                fontSize: "13px",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontSize: "12px", textTransform: "uppercase" }}>
                <th style={{ padding: "14px 20px" }}>Member Name</th>
                <th style={{ padding: "14px 20px" }}>Roll / Email</th>
                <th style={{ padding: "14px 20px" }}>Branch & Year</th>
                <th style={{ padding: "14px 20px" }}>Designation</th>
                <th style={{ padding: "14px 20px" }}>Joined Date</th>
                <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m) => (
                <tr key={m.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ fontWeight: "600", color: "#0F172A" }}>{m.name}</div>
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ color: "#334155" }}>{m.studentId}</div>
                    <div style={{ fontSize: "12px", color: "#64748B" }}>{m.email}</div>
                  </td>
                  <td style={{ padding: "14px 20px", color: "#334155" }}>
                    {m.branch} (Yr {m.year})
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <span
                      style={{
                        background: m.role === "CLUB_HEAD" ? "#EEF2FF" : "#F1F5F9",
                        color: m.role === "CLUB_HEAD" ? "#4F46E5" : "#475569",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "700",
                      }}
                    >
                      {m.role === "CLUB_HEAD" ? "Club President" : "Active Member"}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", color: "#64748B", fontSize: "13px" }}>{m.joinedDate}</td>
                  <td style={{ padding: "14px 20px", textAlign: "right" }}>
                    {m.role !== "CLUB_HEAD" && (
                      <Button variant="danger" size="sm" icon={Trash2} onClick={() => handleRemoveMember(m.id)}>
                        Remove
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
