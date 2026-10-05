import React from "react";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export const CalendarView = ({ events = [] }) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        padding: "24px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <CalendarIcon size={20} color="#4F46E5" />
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", margin: 0 }}>
          Campus Events Calendar
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {events.length === 0 ? (
          <div style={{ textAlign: "center", padding: "30px", color: "#94A3B8" }}>
            No scheduled events on the campus calendar yet.
          </div>
        ) : (
          events.map((event) => {
            const startDate = new Date(event.startTime || Date.now());
            const month = startDate.toLocaleDateString("en-US", { month: "short" });
            const day = startDate.getDate();
            const time = startDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

            return (
              <div
                key={event.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "#F8FAFC",
                  border: "1px solid #F1F5F9",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
                    color: "#FFFFFF",
                    borderRadius: "10px",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: "10px", fontWeight: "700", textTransform: "uppercase" }}>{month}</span>
                  <span style={{ fontSize: "18px", fontWeight: "800", lineHeight: "1" }}>{day}</span>
                </div>

                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: "15px", fontWeight: "700", color: "#0F172A", margin: "0 0 4px 0" }}>
                    {event.title}
                  </h4>
                  <div style={{ display: "flex", gap: "16px", fontSize: "12px", color: "#64748B" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} /> {time}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={12} /> {event.venue}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    background: "#EEF2FF",
                    color: "#4F46E5",
                    padding: "4px 10px",
                    borderRadius: "12px",
                  }}
                >
                  {event.club?.name || "Campus Event"}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
