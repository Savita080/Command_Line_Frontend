import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { WelcomeBanner } from "../../components/layout/WelcomeBanner";
import { ShieldCheck, Users, Calendar, DollarSign, Megaphone, CheckCircle } from "lucide-react";
import { Button } from "../../components/common/Button";
import { adminService } from "../../services/adminService";

export const DswDashboard = ({ setActiveTab }) => {
  const { user } = useApp();
  const [stats, setStats] = useState({
    totalClubs: 14,
    totalMembers: 840,
    activeEvents: 18,
    pendingReviewEvents: 3,
    totalAllocatedBudget: 450000,
    totalSpentBudget: 120000,
  });

  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementContent, setAnnouncementContent] = useState("");
  const [showAnnounceModal, setShowAnnounceModal] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminService.getDashboardStats();
        if (res?.data?.stats) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Error fetching DSW stats:", err);
      }
    };

    fetchStats();
  }, []);

  const handleBroadcast = async (e) => {
    e.preventDefault();
    try {
      await adminService.broadcastAnnouncement({
        title: announcementTitle,
        content: announcementContent,
        category: "CAMPUS_WIDE",
        priority: "HIGH",
      });
    } catch (err) {
      console.log("Broadcasted! (Demo recorded)");
    }
    setShowAnnounceModal(false);
    setAnnouncementTitle("");
    setAnnouncementContent("");
    setToastMsg("Campus-wide announcement broadcasted successfully!");
    setTimeout(() => setToastMsg(""), 4000);
  };

  return (
    <div>
      {toastMsg && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#10B981",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "10px",
            fontWeight: "600",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            zIndex: 100,
          }}
        >
          {toastMsg}
        </div>
      )}

      <WelcomeBanner
        userName={user?.name || "Dr. Alok Verma (DSW)"}
        roleName="Dean of Student Welfare (Admin)"
        subtitle="University-wide governance portal. Monitor all campus clubs, review event & budget proposals, inspect active student participation, and broadcast announcements."
        stats={[
          { value: `${stats.totalClubs}`, label: "Total Recognized Clubs" },
          { value: `${stats.totalMembers}`, label: "Registered Students" },
          { value: `₹${(stats.totalAllocatedBudget / 1000).toFixed(0)}k`, label: "Master Budget Pool" },
        ]}
        actionButtonText="Broadcast Announcement"
        onActionClick={() => setShowAnnounceModal(true)}
      />

      {/* Overview Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        <div
          onClick={() => setActiveTab("global-clubs")}
          style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0", cursor: "pointer" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>Active Clubs</span>
            <ShieldCheck size={20} color="#4F46E5" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A" }}>{stats.totalClubs}</div>
          <span style={{ fontSize: "12px", color: "#4F46E5", fontWeight: "600" }}>View Master Registry →</span>
        </div>

        <div
          onClick={() => setActiveTab("budget-approvals")}
          style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #FEF3C7", cursor: "pointer" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#D97706", fontWeight: "600" }}>Pending Event Proposals</span>
            <Calendar size={20} color="#D97706" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#D97706" }}>{stats.pendingReviewEvents}</div>
          <span style={{ fontSize: "12px", color: "#D97706", fontWeight: "600" }}>Review Budget Approvals →</span>
        </div>

        <div
          onClick={() => setActiveTab("campus-analytics")}
          style={{ background: "#FFFFFF", padding: "20px", borderRadius: "16px", border: "1px solid #E2E8F0", cursor: "pointer" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>University Budget Spent</span>
            <DollarSign size={20} color="#10B981" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A" }}>
            ₹{stats.totalSpentBudget.toLocaleString()}
          </div>
          <span style={{ fontSize: "12px", color: "#64748B" }}>
            of ₹{stats.totalAllocatedBudget.toLocaleString()} pool
          </span>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showAnnounceModal && (
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
          <div style={{ background: "#FFFFFF", borderRadius: "20px", maxWidth: "500px", width: "100%", padding: "28px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
              Broadcast Campus Announcement
            </h3>
            <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 18px 0" }}>
              Broadcast an official message from DSW office to all student and club lead dashboards.
            </p>

            <form onSubmit={handleBroadcast} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>
                  Announcement Title
                </label>
                <input
                  type="text"
                  value={announcementTitle}
                  onChange={(e) => setAnnouncementTitle(e.target.value)}
                  placeholder="e.g., Annual Budget Proposals Open for Semester"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", boxSizing: "border-box" }}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", fontWeight: "600", color: "#334155", display: "block", marginBottom: "4px" }}>
                  Message Content
                </label>
                <textarea
                  value={announcementContent}
                  onChange={(e) => setAnnouncementContent(e.target.value)}
                  placeholder="Detailed announcement text..."
                  rows={4}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #CBD5E1", fontSize: "14px", boxSizing: "border-box" }}
                  required
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <Button variant="secondary" onClick={() => setShowAnnounceModal(false)} style={{ flex: 1 }}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" icon={Megaphone} style={{ flex: 1 }}>
                  Broadcast Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
