import React, { useState, useEffect } from "react";
import { DollarSign, CheckCircle, XCircle } from "lucide-react";
import { Button } from "../../components/common/Button";
import { adminService } from "../../services/adminService";

export const BudgetApprovals = () => {
  const [masterBudgets, setMasterBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const res = await adminService.getMasterBudgets();
        if (res?.data?.masterBudgets) {
          setMasterBudgets(res.data.masterBudgets);
        }
      } catch (e) {
        console.error("Error loading master budgets:", e);
        // Fallback demo
        setMasterBudgets([
          {
            id: 1,
            name: "AI & Coding Club",
            category: "TECHNICAL",
            allocatedBudget: 50000,
            spentBudget: 15000,
            remainingBudget: 35000,
            utilizationPercentage: "30.0%",
          },
          {
            id: 2,
            name: "Music & Dramatics Society",
            category: "CULTURAL",
            allocatedBudget: 40000,
            spentBudget: 8000,
            remainingBudget: 32000,
            utilizationPercentage: "20.0%",
          },
          {
            id: 3,
            name: "Inter-College Sports League",
            category: "SPORTS",
            allocatedBudget: 60000,
            spentBudget: 22000,
            remainingBudget: 38000,
            utilizationPercentage: "36.7%",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Master Budget Tracking & Approvals
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Inspect annual budget allocations, track club spending, and govern institutional financial approvals.
        </p>
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontSize: "12px", textTransform: "uppercase" }}>
                <th style={{ padding: "14px 20px" }}>Club Name</th>
                <th style={{ padding: "14px 20px" }}>Category</th>
                <th style={{ padding: "14px 20px" }}>Allocated Budget</th>
                <th style={{ padding: "14px 20px" }}>Spent Budget</th>
                <th style={{ padding: "14px 20px" }}>Remaining Pool</th>
                <th style={{ padding: "14px 20px" }}>Utilization</th>
              </tr>
            </thead>
            <tbody>
              {masterBudgets.map((b) => (
                <tr key={b.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <td style={{ padding: "14px 20px", fontWeight: "700", color: "#0F172A" }}>{b.name}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <span style={{ background: "#EEF2FF", color: "#4F46E5", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "700" }}>
                      {b.category}
                    </span>
                  </td>
                  <td style={{ padding: "14px 20px", color: "#0F172A", fontWeight: "600" }}>₹{b.allocatedBudget.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px", color: "#DC2626", fontWeight: "600" }}>₹{b.spentBudget.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px", color: "#10B981", fontWeight: "700" }}>₹{b.remainingBudget.toLocaleString()}</td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ flex: 1, background: "#F1F5F9", borderRadius: "6px", height: "8px" }}>
                        <div style={{ width: b.utilizationPercentage, height: "100%", background: "#4F46E5", borderRadius: "6px" }} />
                      </div>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "#334155" }}>{b.utilizationPercentage}</span>
                    </div>
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
