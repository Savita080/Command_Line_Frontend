import React from "react";
import { BarChart3, PieChart, Users, DollarSign } from "lucide-react";

export const CampusAnalytics = () => {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Campus-Wide Engagement & Analytics
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          University metrics: student club participation, category distribution, and event frequency.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Total Active Students</span>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#4F46E5", marginTop: "4px" }}>840</div>
          <span style={{ fontSize: "12px", color: "#10B981" }}>64% of campus enrolled</span>
        </div>

        <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Total Approved Campus Events</span>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#3B82F6", marginTop: "4px" }}>18</div>
          <span style={{ fontSize: "12px", color: "#64748B" }}>4 completed this month</span>
        </div>

        <div style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0" }}>
          <span style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>Overall Budget Expenditure</span>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#10B981", marginTop: "4px" }}>26.6%</div>
          <span style={{ fontSize: "12px", color: "#64748B" }}>₹120,000 spent / ₹450,000</span>
        </div>
      </div>

      {/* Category Breakdown Bar Visual */}
      <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "24px" }}>
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>
          Club Distribution by Category
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
              <span>Technical & Coding (5 Clubs)</span>
              <span>38%</span>
            </div>
            <div style={{ background: "#F1F5F9", borderRadius: "6px", height: "12px" }}>
              <div style={{ width: "38%", height: "100%", background: "#4F46E5", borderRadius: "6px" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
              <span>Cultural & Performing Arts (4 Clubs)</span>
              <span>28%</span>
            </div>
            <div style={{ background: "#F1F5F9", borderRadius: "6px", height: "12px" }}>
              <div style={{ width: "28%", height: "100%", background: "#EC4899", borderRadius: "6px" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: "600", marginBottom: "4px" }}>
              <span>Sports & Athletics (3 Clubs)</span>
              <span>22%</span>
            </div>
            <div style={{ background: "#F1F5F9", borderRadius: "6px", height: "12px" }}>
              <div style={{ width: "22%", height: "100%", background: "#10B981", borderRadius: "6px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
