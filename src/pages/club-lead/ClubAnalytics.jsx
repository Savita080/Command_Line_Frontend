import React from "react";
import { BarChart3, TrendingUp, Users, DollarSign, Award } from "lucide-react";

export const ClubAnalytics = () => {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Club Analytics & Governance Metrics
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Track member growth trends, application acceptance rates, event participation, and annual budget utilization.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Total Members</span>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#4F46E5", marginTop: "4px" }}>142</div>
          <span style={{ fontSize: "12px", color: "#10B981" }}>↑ 18% growth this term</span>
        </div>

        <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Application Acceptance Rate</span>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#10B981", marginTop: "4px" }}>78.5%</div>
          <span style={{ fontSize: "12px", color: "#64748B" }}>32 of 41 applicants admitted</span>
        </div>

        <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Annual Budget Utilization</span>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#3B82F6", marginTop: "4px" }}>30.0%</div>
          <span style={{ fontSize: "12px", color: "#64748B" }}>₹15,000 spent / ₹50,000 allocated</span>
        </div>
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>
          Budget Spent vs Allocated Visual Progress
        </h3>
        <div style={{ background: "#F1F5F9", borderRadius: "10px", height: "24px", overflow: "hidden", marginBottom: "8px" }}>
          <div
            style={{
              width: "30%",
              height: "100%",
              background: "linear-gradient(90deg, #4F46E5 0%, #3B82F6 100%)",
              borderRadius: "10px",
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#64748B" }}>
          <span>Spent: ₹15,000</span>
          <span>Remaining: ₹35,000</span>
        </div>
      </div>
    </div>
  );
};
