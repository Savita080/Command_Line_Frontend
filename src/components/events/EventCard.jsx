import React from "react";
import { Calendar, MapPin, Clock, DollarSign, ExternalLink, CheckCircle, Clock3 } from "lucide-react";
import { Button } from "../common/Button";

export const EventCard = ({ event, onRegister, onReview, isLeadOrDsw = false }) => {
  const startDate = event.startTime ? new Date(event.startTime) : new Date();
  const dateString = startDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeString = startDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusColors = {
    APPROVED: { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" },
    PENDING: { bg: "#FEF3C7", text: "#D97706", border: "#FDE68A" },
    REJECTED: { bg: "#FEF2F2", text: "#DC2626", border: "#FECACA" },
    COMPLETED: { bg: "#F1F5F9", text: "#475569", border: "#E2E8F0" },
  };

  const statusStyle = statusColors[event.status] || statusColors.APPROVED;

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "14px",
        border: "1px solid #E2E8F0",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
      }}
    >
      <div>
        {/* Header: Date Badge & Status */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
          <div
            style={{
              background: "#EEF2FF",
              border: "1px solid #C7D2FE",
              borderRadius: "10px",
              padding: "6px 12px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: "700",
              color: "#4F46E5",
            }}
          >
            <Calendar size={15} />
            <span>{dateString}</span>
          </div>

          <span
            style={{
              background: statusStyle.bg,
              color: statusStyle.text,
              border: `1px solid ${statusStyle.border}`,
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {event.status}
          </span>
        </div>

        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", margin: "0 0 8px 0" }}>
          {event.title}
        </h3>
        <p style={{ fontSize: "13px", color: "#64748B", margin: "0 0 16px 0", lineHeight: "1.5" }}>
          {event.description}
        </p>

        {/* Event Details info grid */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px", fontSize: "13px", color: "#475569" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={16} color="#EC4899" />
            <span><strong>Venue:</strong> {event.venue}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Clock size={16} color="#3B82F6" />
            <span><strong>Time:</strong> {timeString}</span>
          </div>
          {event.budget > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <DollarSign size={16} color="#10B981" />
              <span><strong>Budget Request:</strong> ₹{event.budget.toLocaleString()}</span>
            </div>
          )}
          {event.club?.name && (
            <div style={{ fontSize: "12px", color: "#6366F1", fontWeight: "600", marginTop: "4px" }}>
              Organized by {event.club.name}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ paddingTop: "12px", borderTop: "1px solid #F1F5F9", display: "flex", gap: "8px" }}>
        {event.status === "APPROVED" && (
          <Button
            variant="primary"
            size="sm"
            style={{ width: "100%" }}
            icon={ExternalLink}
            onClick={() => {
              if (event.registrationLink) {
                window.open(event.registrationLink, "_blank");
              } else if (onRegister) {
                onRegister(event);
              }
            }}
          >
            Register / RSVP
          </Button>
        )}

        {event.status === "PENDING" && isLeadOrDsw && onReview && (
          <Button
            variant="secondary"
            size="sm"
            style={{ width: "100%" }}
            onClick={() => onReview(event)}
          >
            Review Proposal
          </Button>
        )}
      </div>
    </div>
  );
};
