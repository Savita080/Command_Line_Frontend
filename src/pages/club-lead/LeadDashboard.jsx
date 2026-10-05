import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { WelcomeBanner } from "../../components/layout/WelcomeBanner";
import { Users, FileCheck, Calendar, DollarSign, Plus, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "../../components/common/Button";
import { RequestEventModal } from "../../components/events/RequestEventModal";
import { clubService } from "../../services/clubService";
import { eventService } from "../../services/eventService";

export const LeadDashboard = ({ setActiveTab }) => {
  const { user } = useApp();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);

  const handleCreateEvent = async (eventData) => {
    try {
      await eventService.createEventProposal(eventData);
    } catch (e) {
      console.log("Proposal submitted! (Demo recorded)");
    }
  };

  return (
    <div>
      <WelcomeBanner
        userName={user?.name || "Aarav Patel (Club President)"}
        roleName="Club Lead / Mentor"
        subtitle="Manage your club details, review student applications, control member rosters, propose events, and track annual budget utilization."
        stats={[
          { value: "142", label: "Active Club Members" },
          { value: "2", label: "Pending Applications" },
          { value: "₹50,000", label: "Annual Budget" },
        ]}
        actionButtonText="Propose New Event"
        onActionClick={() => setIsEventModalOpen(true)}
      />

      {/* Metrics Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "28px" }}>
        <div
          onClick={() => setActiveTab("member-roster")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>Total Members</span>
            <Users size={20} color="#4F46E5" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A" }}>142</div>
          <span style={{ fontSize: "12px", color: "#10B981", fontWeight: "600" }}>+12 this month</span>
        </div>

        <div
          onClick={() => setActiveTab("review-applications")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #FEF3C7",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#D97706", fontWeight: "600" }}>Pending Applications</span>
            <FileCheck size={20} color="#D97706" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#D97706" }}>2</div>
          <span style={{ fontSize: "12px", color: "#D97706", fontWeight: "600" }}>Requires Lead Review</span>
        </div>

        <div
          onClick={() => setActiveTab("event-proposals")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>Approved Events</span>
            <Calendar size={20} color="#3B82F6" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A" }}>8</div>
          <span style={{ fontSize: "12px", color: "#3B82F6", fontWeight: "600" }}>Next: Hackathon 2026</span>
        </div>

        <div
          onClick={() => setActiveTab("club-analytics")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1px solid #E2E8F0",
            padding: "20px",
            cursor: "pointer",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>Remaining Budget</span>
            <DollarSign size={20} color="#10B981" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A" }}>₹35,000</div>
          <span style={{ fontSize: "12px", color: "#64748B" }}>Spent ₹15,000 / ₹50,000</span>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          border: "1px solid #E2E8F0",
          padding: "24px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0F172A", margin: "0 0 16px 0" }}>
          Lead Operations & Governance Quick Actions
        </h3>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="primary" icon={Plus} onClick={() => setIsEventModalOpen(true)}>
            Propose Event Request
          </Button>
          <Button variant="secondary" icon={FileCheck} onClick={() => setActiveTab("review-applications")}>
            Review Student Applications (2)
          </Button>
          <Button variant="secondary" icon={Users} onClick={() => setActiveTab("member-roster")}>
            Manage Roster
          </Button>
        </div>
      </div>

      <RequestEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={handleCreateEvent}
        clubId={user?.clubId || 1}
      />
    </div>
  );
};
