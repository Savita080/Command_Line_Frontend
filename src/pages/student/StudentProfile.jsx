import React from "react";
import { useApp } from "../../context/AppContext";
import { User, Mail, Award, BookOpen, Calendar, ShieldCheck, CheckCircle } from "lucide-react";
import { Button } from "../../components/common/Button";

export const StudentProfile = () => {
  const { user } = useApp();

  const profileData = {
    name: user?.name || "Pooja Sharma",
    email: user?.email || "student1@gla.ac.in",
    role: user?.role || "STUDENT",
    studentId: user?.studentId || "2024EC0089",
    branch: user?.branch || "Electronics & Communication Engineering",
    year: user?.year || 2,
    avatarUrl: user?.avatarUrl,
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Student User Profile
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Manage your personal university credentials, academic details, and club membership records.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "24px" }}>
        {/* Left Profile Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            padding: "28px",
            textAlign: "center",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
              color: "#FFFFFF",
              fontSize: "32px",
              fontWeight: "800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px auto",
              boxShadow: "0 8px 16px rgba(79, 70, 229, 0.3)",
            }}
          >
            {profileData.name.charAt(0)}
          </div>

          <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 4px 0" }}>
            {profileData.name}
          </h3>
          <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 12px 0" }}>
            {profileData.email}
          </p>

          <span
            style={{
              background: "#EEF2FF",
              color: "#4F46E5",
              padding: "4px 14px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            Role: {profileData.role}
          </span>
        </div>

        {/* Right Details Grid */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            border: "1px solid #E2E8F0",
            padding: "28px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          }}
        >
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", margin: "0 0 20px 0" }}>
            Academic & Identification Details
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div style={{ background: "#F8FAFC", padding: "16px", borderRadius: "12px" }}>
              <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "4px" }}>
                STUDENT ROLL / ID
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A" }}>
                {profileData.studentId}
              </div>
            </div>

            <div style={{ background: "#F8FAFC", padding: "16px", borderRadius: "12px" }}>
              <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "4px" }}>
                ACADEMIC YEAR
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A" }}>
                Year {profileData.year}
              </div>
            </div>

            <div style={{ background: "#F8FAFC", padding: "16px", borderRadius: "12px", gridColumn: "span 2" }}>
              <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600", marginBottom: "4px" }}>
                DEPARTMENT / BRANCH
              </div>
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A" }}>
                {profileData.branch}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
