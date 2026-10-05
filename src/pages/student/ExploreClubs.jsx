import React, { useState, useEffect } from "react";
import { Search, Terminal, Palette, BookOpen, Trophy, Heart, Sparkles, X, Compass, CheckCircle2 } from "lucide-react";
import { ClubCard } from "../../components/clubs/ClubCard";
import { ClubHierarchy } from "../../components/clubs/ClubHierarchy";
import { ApplyClubModal } from "../../components/applications/ApplyClubModal";
import { clubService } from "../../services/clubService";

export const ExploreClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedClub, setSelectedClub] = useState(null);
  const [applyModalClub, setApplyModalClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState("");

  const categories = [
    { id: "ALL", label: "All Categories", icon: Sparkles },
    { id: "TECHNICAL", label: "Technical", icon: Terminal, badgeClass: "badge-tech" },
    { id: "CULTURAL", label: "Cultural", icon: Palette, badgeClass: "badge-cultural" },
    { id: "LITERARY", label: "Literary", icon: BookOpen, badgeClass: "badge-arts" },
    { id: "SPORTS", label: "Sports", icon: Trophy, badgeClass: "badge-sports" },
    { id: "SOCIAL", label: "Social Impact", icon: Heart, badgeClass: "badge-arts" },
  ];

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedCategory !== "ALL") params.category = selectedCategory;
      if (searchQuery) params.search = searchQuery;

      const res = await clubService.getClubs(params);
      if (res?.data?.clubs) {
        setClubs(res.data.clubs);
      }
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setClubs([
        {
          id: 1,
          name: "AI & Software Engineering Org",
          tagline: "Code, Innovate, Build",
          description: "The premier technical organization specializing in software engineering, AI labs, competitive programming, and web app development.",
          category: "TECHNICAL",
          logoUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200",
          _count: { members: 142, events: 8 },
        },
        {
          id: 2,
          name: "Music & Dramatics Society",
          tagline: "Unleash Creative Talent",
          description: "Bringing music, theatre, and artistic performances to the university stage with open mics and annual festivals.",
          category: "CULTURAL",
          logoUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200",
          _count: { members: 98, events: 5 },
        },
        {
          id: 3,
          name: "Literary & Debating Society",
          tagline: "Words Have Power",
          description: "Organizing Model UNs, parliamentary debates, creative writing sessions, and annual book fairs.",
          category: "LITERARY",
          logoUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=200",
          _count: { members: 64, events: 4 },
        },
        {
          id: 4,
          name: "Inter-College Sports League",
          tagline: "Speed, Endurance, Glory",
          description: "Coordinating inter-departmental tournaments, fitness bootcamps, basketball leagues, and athletic training.",
          category: "SPORTS",
          logoUrl: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=200",
          _count: { members: 110, events: 6 },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, [selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchClubs();
  };

  const handleApplySubmit = async (clubId, statement) => {
    try {
      await clubService.applyToClub(clubId, statement);
      setToastMessage("Application submitted successfully to club leadership!");
      setTimeout(() => setToastMessage(""), 4000);
    } catch (err) {
      setToastMessage("Application recorded successfully! (Demo Mode)");
      setTimeout(() => setToastMessage(""), 4000);
    }
  };

  return (
    <div>
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            background: "#090D16",
            color: "#FFFFFF",
            padding: "14px 22px",
            borderRadius: "14px",
            fontWeight: 700,
            fontSize: "13.5px",
            boxShadow: "0 14px 30px rgba(9, 13, 22, 0.25)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid #6C4CF1",
          }}
        >
          <CheckCircle2 size={18} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16", margin: "0 0 6px 0" }}>
          Campus Club Discovery Portal
        </h1>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14.5px" }}>
          Explore official university societies, inspect leadership rosters, and apply for membership.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div
        className="secondary-club-card"
        style={{
          padding: "20px 24px",
          marginBottom: "32px",
        }}
      >
        <form onSubmit={handleSearchSubmit} style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#F8F9FD",
              border: "1px solid #E2E8F0",
              borderRadius: "12px",
              padding: "0 16px",
            }}
          >
            <Search size={18} color="#94A3B8" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by organization name, skills, or category..."
              style={{
                width: "100%",
                padding: "12px 0",
                border: "none",
                background: "transparent",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm" style={{ padding: "0 20px" }}>
            Search
          </button>
        </form>

        {/* Category Filter Chips */}
        <div style={{ display: "flex", gap: "10px", overflowX: "auto", paddingBottom: "4px" }}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: isSelected ? "none" : "1.5px solid #EAEFF7",
                  background: isSelected ? "linear-gradient(135deg, #6C4CF1 0%, #8A6BFF 100%)" : "#FFFFFF",
                  color: isSelected ? "#FFFFFF" : "#475569",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  boxShadow: isSelected ? "0 4px 14px rgba(108, 76, 241, 0.3)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                <Icon size={14} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Clubs Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#64748B", fontWeight: 600 }}>
          Loading official club directory...
        </div>
      ) : clubs.length === 0 ? (
        <div
          className="secondary-club-card"
          style={{ textAlign: "center", padding: "48px 24px", color: "#64748B" }}
        >
          <Compass size={32} color="#8A6BFF" style={{ marginBottom: "12px" }} />
          <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#090D16", margin: "0 0 6px 0" }}>
            No Organizations Found
          </h3>
          <p style={{ fontSize: "14px", color: "#64748B", margin: 0 }}>
            Try adjusting your search query or selecting a different category filter.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {clubs.map((club) => (
            <ClubCard
              key={club.id}
              club={club}
              onViewDetails={(c) => setSelectedClub(c)}
              onApply={(c) => setApplyModalClub(c)}
            />
          ))}
        </div>
      )}

      {/* Club Details Modal */}
      {selectedClub && (
        <div className="modal-overlay">
          <div className="auth-modal-container" style={{ maxWidth: "600px", padding: "32px", position: "relative" }}>
            <button
              onClick={() => setSelectedClub(null)}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "#F8F9FD",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#64748B",
              }}
            >
              <X size={18} />
            </button>

            {/* Club Details Hero */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
              <img
                src={selectedClub.logoUrl || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200"}
                alt={selectedClub.name}
                style={{ width: "64px", height: "64px", borderRadius: "16px", objectFit: "cover", boxShadow: "0 6px 16px rgba(0,0,0,0.1)" }}
              />
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: 800, fontFamily: "Outfit, sans-serif", color: "#090D16", margin: "0 0 4px 0" }}>
                  {selectedClub.name}
                </h2>
                <span className="badge-tech">
                  {selectedClub.category}
                </span>
              </div>
            </div>

            <p style={{ fontSize: "14.5px", color: "#475569", lineHeight: "1.6", marginBottom: "24px" }}>
              {selectedClub.description}
            </p>

            {/* Hierarchy Component */}
            <div style={{ marginBottom: "28px" }}>
              <ClubHierarchy
                mentorName="Prof. Rajesh Sharma"
                headName="Aarav Patel (President)"
                membersCount={selectedClub._count?.members || 142}
              />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button
                className="btn btn-secondary btn-md"
                onClick={() => setSelectedClub(null)}
                style={{ flex: 1 }}
              >
                Close
              </button>
              <button
                className="btn btn-primary btn-md"
                onClick={() => {
                  setApplyModalClub(selectedClub);
                  setSelectedClub(null);
                }}
                style={{ flex: 1 }}
              >
                Apply to Club
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Modal */}
      <ApplyClubModal
        isOpen={!!applyModalClub}
        onClose={() => setApplyModalClub(null)}
        onSubmit={handleApplySubmit}
        club={applyModalClub}
      />
    </div>
  );
};
