import React from "react";
import { Users, Calendar, ShieldCheck, ArrowUpRight } from "lucide-react";

export const ClubCard = ({ club, onViewDetails, onApply, isMember = false }) => {
  const memberCount = club._count?.members ?? club.memberCount ?? 0;
  const eventCount = club._count?.events ?? club.eventCount ?? 0;

  const categoryBadges = {
    TECHNICAL: { badgeClass: "badge-tech", label: "Technical" },
    CULTURAL: { badgeClass: "badge-cultural", label: "Cultural" },
    SPORTS: { badgeClass: "badge-sports", label: "Sports" },
    LITERARY: { badgeClass: "badge-arts", label: "Literary" },
    SOCIAL: { badgeClass: "badge-arts", label: "Social Impact" },
    OTHER: { badgeClass: "badge-tech", label: "Creative Arts" },
  };

  const badgeInfo = categoryBadges[club.category] || categoryBadges.TECHNICAL;

  return (
    <div className="secondary-club-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        {/* Banner Image / Cover */}
        <div
          style={{
            height: "115px",
            background: club.bannerUrl
              ? `url(${club.bannerUrl}) center/cover no-repeat`
              : "linear-gradient(135deg, #090D16 0%, #6C4CF1 100%)",
            position: "relative",
            padding: "12px",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
          }}
        >
          <span
            className={badgeInfo.badgeClass}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              fontSize: "11px",
            }}
          >
            {badgeInfo.label}
          </span>
        </div>

        {/* Content Body */}
        <div style={{ padding: "16px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "-38px", marginBottom: "12px" }}>
            <img
              src={
                club.logoUrl ||
                "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200"
              }
              alt={club.name}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "14px",
                objectFit: "cover",
                border: "3px solid #FFFFFF",
                boxShadow: "0 4px 12px rgba(9, 13, 22, 0.12)",
                background: "#FFFFFF",
              }}
            />
            {isMember && (
              <span
                style={{
                  background: "#ECFDF5",
                  color: "#047857",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  padding: "4px 10px",
                  borderRadius: "16px",
                  fontSize: "11.5px",
                  fontWeight: 700,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <ShieldCheck size={13} /> Member
              </span>
            )}
          </div>

          <h3
            style={{
              fontSize: "18px",
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              color: "#090D16",
              margin: "0 0 4px 0",
              lineHeight: 1.25,
            }}
          >
            {club.name}
          </h3>

          {club.tagline && (
            <p style={{ fontSize: "12.5px", fontWeight: 600, color: "#6C4CF1", margin: "0 0 8px 0" }}>
              "{club.tagline}"
            </p>
          )}

          <p
            style={{
              fontSize: "13px",
              color: "#475569",
              margin: "0 0 16px 0",
              lineHeight: 1.5,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {club.description}
          </p>

          {/* Metrics */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "12.5px",
              color: "#64748B",
              paddingTop: "12px",
              borderTop: "1px solid #F1F5F9",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Users size={14} color="#6C4CF1" />
              <strong>{memberCount}</strong> Members
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Calendar size={14} color="#10B981" />
              <strong>{eventCount}</strong> Events
            </span>
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div
        style={{
          padding: "12px 20px 16px 20px",
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
          onClick={() => onViewDetails && onViewDetails(club)}
        >
          <span>View Details</span>
          <ArrowUpRight size={14} />
        </button>
        {!isMember && onApply && (
          <button
            className="btn btn-primary btn-sm"
            style={{ flex: 1 }}
            onClick={() => onApply(club)}
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};
