import React, { useState, useEffect } from "react";
import { FileCheck, Clock, CheckCircle, XCircle } from "lucide-react";
import { authService } from "../../services/authService";

export const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const profileRes = await authService.getProfile();
        const userApps = profileRes?.data?.user?.applications || [];
        setApplications(
          userApps.map((app) => ({
            id: app.id,
            clubName: app.club?.name || "AI & Coding Club",
            category: app.club?.category || "TECHNICAL",
            statement: app.statement,
            status: app.status,
            submittedDate: new Date(app.createdAt).toLocaleDateString(),
            reviewNotes: app.reviewNotes || "Under review by Faculty Mentor & Club Lead.",
          }))
        );
      } catch (err) {
        console.error("Error loading user applications:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          My Club Membership Applications
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Live application tracker syncing with the backend database.
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "40px", color: "#94A3B8" }}>Loading applications from database...</div>
      ) : applications.length === 0 ? (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "40px", textAlign: "center", border: "1px solid #E2E8F0" }}>
          <h3 style={{ color: "#0F172A", margin: "0 0 8px 0" }}>No Submitted Applications Found</h3>
          <p style={{ color: "#64748B", margin: 0 }}>Explore campus clubs and apply to get started.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {applications.map((app) => {
            const statusStyles = {
              APPROVED: { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0", icon: CheckCircle },
              PENDING: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A", icon: Clock },
              REJECTED: { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA", icon: XCircle },
            };
            const style = statusStyles[app.status] || statusStyles.PENDING;
            const StatusIcon = style.icon;

            return (
              <div
                key={app.id}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "16px",
                  border: "1px solid #E2E8F0",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
                      {app.clubName}
                    </h3>
                    <span style={{ fontSize: "12px", color: "#6366F1", fontWeight: "600" }}>
                      ({app.category})
                    </span>
                  </div>

                  <div
                    style={{
                      background: "#F8FAFC",
                      borderRadius: "10px",
                      padding: "12px 14px",
                      fontSize: "13px",
                      color: "#475569",
                      marginBottom: "12px",
                      lineHeight: "1.5",
                    }}
                  >
                    <strong>Statement:</strong> "{app.statement}"
                  </div>

                  {app.reviewNotes && (
                    <div style={{ fontSize: "12px", color: "#64748B" }}>
                      <strong>Note from Lead/Mentor:</strong> {app.reviewNotes}
                    </div>
                  )}
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      background: style.bg,
                      color: style.text,
                      border: `1px solid ${style.border}`,
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      marginBottom: "8px",
                    }}
                  >
                    <StatusIcon size={14} />
                    <span>{app.status}</span>
                  </span>
                  <div style={{ fontSize: "12px", color: "#94A3B8" }}>
                    Submitted: {app.submittedDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
