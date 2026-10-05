import React, { useEffect, useState } from "react";
import { useApp } from "../../context/AppContext";
import { WelcomeBanner } from "../../components/layout/WelcomeBanner";
import { ClubCard } from "../../components/clubs/ClubCard";
import { Compass, Users, FileCheck, Calendar, ArrowUpRight } from "lucide-react";
import { clubService } from "../../services/clubService";
import { eventService } from "../../services/eventService";

export const StudentDashboard = ({ setActiveTab }) => {
  const { user } = useApp();
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [clubsRes, eventsRes] = await Promise.all([
          clubService.getClubs().catch(() => null),
          eventService.getEvents().catch(() => null),
        ]);

        if (clubsRes?.data?.clubs) {
          setFeaturedClubs(clubsRes.data.clubs.slice(0, 3));
        } else {
          setFeaturedClubs([
            {
              id: 1,
              name: "AI & Software Engineering Org",
              tagline: "Code, Innovate, Build",
              description: "The premier technical organization specializing in software engineering, AI labs, and web app development.",
              category: "TECHNICAL",
              _count: { members: 142, events: 8 },
            },
            {
              id: 2,
              name: "Music & Dramatics Society",
              tagline: "Unleash Creative Talent",
              description: "Bringing music, theatre, and artistic performances to the university stage.",
              category: "CULTURAL",
              _count: { members: 98, events: 5 },
            },
          ]);
        }

        if (eventsRes?.data?.events) {
          setUpcomingEvents(eventsRes.data.events.slice(0, 2));
        } else {
          setUpcomingEvents([
            {
              id: 101,
              title: "Annual Hackathon 2026",
              description: "36-hour sprint creating innovative AI products for social impact.",
              venue: "Main Auditorium & CS Labs",
              startTime: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
              status: "APPROVED",
              club: { name: "AI & Software Engineering Org" },
            },
          ]);
        }
      } catch (e) {
        console.error("Dashboard data load error:", e);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div>
      {/* 1. WELCOME BANNER WITH PERSONALITY */}
      <WelcomeBanner
        userName={user?.name || "Student"}
        roleName="Student Portal"
        subtitle="Explore active campus organizations, track your application statuses, and participate in upcoming university hackathons and events."
        stats={[
          { value: "6+", label: "Club Categories" },
          { value: "14", label: "Active Clubs" },
          { value: "8", label: "Upcoming Events" },
        ]}
        actionButtonText="Explore Clubs Portal"
        onActionClick={() => setActiveTab("explore")}
      />

      {/* 2. STATS & QUICK ACTIVITY METRICS (Minimal Chrome, Bold Typography) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
        <div
          onClick={() => setActiveTab("my-clubs")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1.5px solid #EAEFF7",
            padding: "20px",
            cursor: "pointer",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Enrolled Clubs</span>
            <Users size={18} color="#6C4CF1" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16" }}>1</div>
          <div style={{ fontSize: "12px", color: "#10B981", fontWeight: 600, marginTop: "4px" }}>Active Member</div>
        </div>

        <div
          onClick={() => setActiveTab("my-applications")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1.5px solid #EAEFF7",
            padding: "20px",
            cursor: "pointer",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Pending Applications</span>
            <FileCheck size={18} color="#FF5A5F" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16" }}>1</div>
          <div style={{ fontSize: "12px", color: "#FF5A5F", fontWeight: 600, marginTop: "4px" }}>Awaiting Review</div>
        </div>

        <div
          onClick={() => setActiveTab("events")}
          style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            border: "1.5px solid #EAEFF7",
            padding: "20px",
            cursor: "pointer",
            transition: "border-color 0.2s, box-shadow 0.2s",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#64748B" }}>Upcoming Events</span>
            <Calendar size={18} color="#10B981" />
          </div>
          <div style={{ fontSize: "28px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16" }}>8</div>
          <div style={{ fontSize: "12px", color: "#6C4CF1", fontWeight: 600, marginTop: "4px" }}>This Month</div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "28px" }}>
        {/* Left Column: Featured Clubs */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16", margin: 0 }}>
                Featured Campus Organizations
              </h2>
              <p style={{ fontSize: "13px", color: "#64748B", margin: "2px 0 0 0" }}>
                Top-rated societies accepting new member applications
              </p>
            </div>
            <button
              onClick={() => setActiveTab("explore")}
              className="btn btn-secondary btn-sm"
            >
              <span>Explore All</span>
              <ArrowUpRight size={14} />
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {featuredClubs.map((club) => (
              <ClubCard
                key={club.id}
                club={club}
                onViewDetails={() => setActiveTab("explore")}
                onApply={() => setActiveTab("explore")}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Quick Action Shortcuts & Next Event */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {/* Action Affordance Box */}
          <div className="secondary-club-card" style={{ padding: "20px" }}>
            <h3 style={{ fontSize: "16px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16", margin: "0 0 14px 0" }}>
              Quick Actions
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                onClick={() => setActiveTab("explore")}
                className="btn btn-primary btn-sm"
                style={{ width: "100%", justifyContent: "flex-start", padding: "10px 14px" }}
              >
                <Compass size={16} />
                <span>Browse Club Directory</span>
              </button>
              <button
                onClick={() => setActiveTab("my-applications")}
                className="btn btn-secondary btn-sm"
                style={{ width: "100%", justifyContent: "flex-start", padding: "10px 14px" }}
              >
                <FileCheck size={16} />
                <span>Track My Applications</span>
              </button>
            </div>
          </div>

          {/* Next Campus Event Preview */}
          <div className="secondary-club-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16", margin: 0 }}>
                Next Campus Event
              </h3>
              <Calendar size={18} color="#10B981" />
            </div>

            {upcomingEvents.length > 0 ? (
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#090D16", marginBottom: "4px" }}>
                  {upcomingEvents[0].title}
                </div>
                <div style={{ fontSize: "12.5px", color: "#6C4CF1", fontWeight: 600, marginBottom: "8px" }}>
                  {upcomingEvents[0].club?.name || "Campus Event"}
                </div>
                <p style={{ fontSize: "13px", color: "#475569", margin: "0 0 14px 0", lineHeight: 1.5 }}>
                  {upcomingEvents[0].description}
                </p>
                <div style={{ fontSize: "12px", color: "#64748B", background: "#F8F9FD", padding: "8px 12px", borderRadius: "8px" }}>
                  📍 {upcomingEvents[0].venue}
                </div>
              </div>
            ) : (
              <p style={{ fontSize: "13px", color: "#94A3B8", margin: 0 }}>No upcoming events scheduled right now.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
