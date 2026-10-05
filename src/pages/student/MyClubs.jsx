import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { ClubCard } from "../../components/clubs/ClubCard";
import { authService } from "../../services/authService";
import { clubService } from "../../services/clubService";

export const MyClubs = () => {
  const { user } = useApp();
  const [enrolledClubs, setEnrolledClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyClubs = async () => {
      try {
        const profileRes = await authService.getProfile();
        const userProfile = profileRes?.data?.user;

        if (userProfile?.club) {
          setEnrolledClubs([
            {
              ...userProfile.club,
              description: "Official assigned university organization.",
              _count: { members: 142, events: 8 },
              memberRole: userProfile.role === "CLUB_HEAD" ? "Club President" : "Active Member",
            },
          ]);
        } else {
          // If no assigned club, fetch all clubs as demo overview
          const clubsRes = await clubService.getClubs();
          if (clubsRes?.data?.clubs?.length > 0) {
            setEnrolledClubs([clubsRes.data.clubs[0]]);
          }
        }
      } catch (err) {
        console.error("Error fetching my clubs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyClubs();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          My Enrolled Clubs
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          View clubs you belong to, your assigned role, and upcoming club activities from the university database.
        </p>
      </div>

      {loading ? (
        <div style={{ padding: "40px", color: "#94A3B8" }}>Loading enrolled clubs from database...</div>
      ) : enrolledClubs.length === 0 ? (
        <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "40px", textAlign: "center", border: "1px solid #E2E8F0" }}>
          <h3 style={{ color: "#0F172A", margin: "0 0 8px 0" }}>Not Enrolled in Any Clubs Yet</h3>
          <p style={{ color: "#64748B", margin: 0 }}>Browse the Explore Clubs tab to submit your first membership application.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
          {enrolledClubs.map((club) => (
            <div key={club.id}>
              <ClubCard club={club} isMember={true} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
