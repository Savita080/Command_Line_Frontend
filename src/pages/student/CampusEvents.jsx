import React, { useState, useEffect } from "react";
import { EventCard } from "../../components/events/EventCard";
import { CalendarView } from "../../components/events/CalendarView";
import { eventService } from "../../services/eventService";

export const CampusEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventService.getEvents();
        if (res?.data?.events) {
          setEvents(res.data.events);
        }
      } catch (err) {
        console.error("Error fetching campus events:", err);
        // Fallback demo events
        setEvents([
          {
            id: 1,
            title: "Annual Hackathon 2026",
            description: "36-hour sprint creating innovative AI products for social impact with cash prizes.",
            venue: "Main Auditorium & CS Labs",
            startTime: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
            status: "APPROVED",
            registrationLink: "https://forms.gle/samplehackathon",
            club: { name: "AI & Coding Club" },
          },
          {
            id: 2,
            title: "Campus Music & Drama Fest",
            description: "Live stage performances, battle of bands, and theatrical acts by student talent.",
            venue: "Open Air Amphitheatre",
            startTime: new Date(Date.now() + 12 * 24 * 3600 * 1000).toISOString(),
            status: "APPROVED",
            registrationLink: "https://forms.gle/samplemusic",
            club: { name: "Music & Dramatics Society" },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Campus Events Calendar & Registration
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Discover upcoming workshops, hackathons, cultural fests, and athletic competitions across campus.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px" }}>
        {/* Events Cards List */}
        <div>
          <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", marginBottom: "16px" }}>
            Upcoming Approved Events ({events.length})
          </h3>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Calendar Widget */}
        <div>
          <CalendarView events={events} />
        </div>
      </div>
    </div>
  );
};
