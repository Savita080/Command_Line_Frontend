import React, { useState } from "react";
import { Check, X, Eye, FileText, User } from "lucide-react";
import { Button } from "../common/Button";

export const ApplicationTable = ({ applications = [], onReview }) => {
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredApps = applications.filter((app) => {
    if (statusFilter === "ALL") return true;
    return app.status === statusFilter;
  });

  const handleReviewAction = (app, status) => {
    if (onReview) {
      onReview(app.id, status, reviewNotes);
    }
    setSelectedApp(null);
    setReviewNotes("");
  };

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        overflow: "hidden",
      }}
    >
      {/* Header & Status Filter */}
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
          Membership Applications Roster
        </h3>

        <div style={{ display: "flex", gap: "6px" }}>
          {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                background: statusFilter === status ? "#4F46E5" : "#F1F5F9",
                color: statusFilter === status ? "#FFFFFF" : "#64748B",
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
          <thead>
            <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontSize: "12px", textTransform: "uppercase" }}>
              <th style={{ padding: "14px 20px" }}>Applicant Student</th>
              <th style={{ padding: "14px 20px" }}>Roll / Branch</th>
              <th style={{ padding: "14px 20px" }}>Year</th>
              <th style={{ padding: "14px 20px" }}>Status</th>
              <th style={{ padding: "14px 20px" }}>Date</th>
              <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "40px", color: "#94A3B8" }}>
                  No applications found under filter criteria.
                </td>
              </tr>
            ) : (
              filteredApps.map((app) => {
                const statusStyles = {
                  PENDING: { bg: "#FEF3C7", text: "#D97706" },
                  APPROVED: { bg: "#ECFDF5", text: "#059669" },
                  REJECTED: { bg: "#FEF2F2", text: "#DC2626" },
                };
                const style = statusStyles[app.status] || statusStyles.PENDING;

                return (
                  <tr key={app.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "14px 20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
                            borderRadius: "50%",
                            background: "#EEF2FF",
                            color: "#4F46E5",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "700",
                          }}
                        >
                          {app.user?.name ? app.user.name.charAt(0) : "S"}
                        </div>
                        <div>
                          <div style={{ fontWeight: "600", color: "#0F172A" }}>{app.user?.name || "Student Applicant"}</div>
                          <div style={{ fontSize: "12px", color: "#64748B" }}>{app.user?.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#334155" }}>
                      <div>{app.user?.studentId || "N/A"}</div>
                      <div style={{ fontSize: "12px", color: "#64748B" }}>{app.user?.branch || "General"}</div>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#334155" }}>Year {app.user?.year || 2}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span
                        style={{
                          background: style.bg,
                          color: style.text,
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "11px",
                          fontWeight: "700",
                        }}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#64748B", fontSize: "13px" }}>
                      {new Date(app.createdAt || Date.now()).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px 20px", textAlign: "right" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setSelectedApp(app)}
                        >
                          Review Statement
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedApp && (
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
              borderRadius: "18px",
              maxWidth: "480px",
              width: "100%",
              padding: "28px",
            }}
          >
            <h4 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>
              Review Application Statement
            </h4>
            <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 16px 0" }}>
              Applicant: <strong>{selectedApp.user?.name}</strong> ({selectedApp.user?.branch}, Yr {selectedApp.user?.year})
            </p>

            <div
              style={{
                background: "#F8FAFC",
                border: "1px solid #E2E8F0",
                borderRadius: "10px",
                padding: "14px",
                fontSize: "14px",
                color: "#334155",
                marginBottom: "16px",
                lineHeight: "1.5",
              }}
            >
              "{selectedApp.statement}"
            </div>

            {selectedApp.status === "PENDING" && (
              <div style={{ marginBottom: "16px" }}>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>
                  Feedback / Review Note (Optional)
                </label>
                <input
                  type="text"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="e.g., Welcome to the technical team!"
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "1px solid #CBD5E1",
                    fontSize: "13px",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <Button variant="secondary" onClick={() => setSelectedApp(null)} style={{ flex: 1 }}>
                Close
              </Button>
              {selectedApp.status === "PENDING" && (
                <>
                  <Button
                    variant="danger"
                    onClick={() => handleReviewAction(selectedApp, "REJECTED")}
                    style={{ flex: 1 }}
                  >
                    Reject
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => handleReviewAction(selectedApp, "APPROVED")}
                    style={{ flex: 1 }}
                  >
                    Approve Member
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
