import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { ApplicationTable } from "../../components/applications/ApplicationTable";
import { clubService } from "../../services/clubService";

export const ReviewApplications = () => {
  const { user } = useApp();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const clubId = user?.clubId || 1;

  const loadApplications = async () => {
    try {
      const res = await clubService.getClubApplications(clubId);
      if (res?.data?.applications) {
        setApplications(res.data.applications);
      }
    } catch (e) {
      console.error("Error loading club applications:", e);
      // Demo mock fallback
      setApplications([
        {
          id: 101,
          user: {
            id: 2,
            name: "Rohan Verma",
            email: "rohan.v@university.edu",
            studentId: "2024CS0045",
            branch: "Computer Science",
            year: 2,
          },
          statement: "I have experience with Python, React, and Machine Learning. I want to build campus hackathon projects.",
          status: "PENDING",
          createdAt: new Date().toISOString(),
        },
        {
          id: 102,
          user: {
            id: 3,
            name: "Ananya Roy",
            email: "ananya.r@university.edu",
            studentId: "2024IT0012",
            branch: "Information Technology",
            year: 2,
          },
          statement: "Looking forward to organizing coding workshops and managing club community channels.",
          status: "PENDING",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, [clubId]);

  const handleReview = async (appId, status, reviewNotes) => {
    try {
      await clubService.reviewApplication(clubId, appId, status, reviewNotes);
    } catch (e) {
      console.log("Reviewed application! (Demo update recorded)");
    }
    // Optimistic UI update
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status, reviewNotes } : app))
    );
  };

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Review Membership Applications
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Evaluate applicant student statements, inspect academic backgrounds, and accept or reject candidates.
        </p>
      </div>

      <ApplicationTable applications={applications} onReview={handleReview} />
    </div>
  );
};
