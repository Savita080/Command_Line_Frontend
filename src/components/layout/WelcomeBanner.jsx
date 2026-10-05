import React from "react";
import { Sparkles, Compass } from "lucide-react";

export const WelcomeBanner = ({
  userName = "Student",
  roleName = "Student",
  subtitle = "Discover campus clubs, join teams, track applications and participate in events.",
  stats = [],
  actionButtonText = "",
  onActionClick,
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #090D16 0%, #1E1B4B 60%, #6C4CF1 100%)",
        borderRadius: "20px",
        padding: "32px 36px",
        color: "#FFFFFF",
        marginBottom: "32px",
        boxShadow: "0 16px 36px -10px rgba(9, 13, 22, 0.25)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "24px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(10px)",
              padding: "4px 12px",
              borderRadius: "20px",
              fontSize: "12px",
              fontWeight: 700,
              marginBottom: "12px",
              color: "#C7D2FE",
            }}
          >
            <Sparkles size={14} color="#8A6BFF" />
            <span>CommandLine Student Portal • {roleName}</span>
          </div>

          <h1
            style={{
              fontSize: "30px",
              fontWeight: 800,
              fontFamily: "Outfit, sans-serif",
              color: "#FFFFFF",
              margin: "0 0 8px 0",
              letterSpacing: "-0.025em",
            }}
          >
            Welcome back, {userName}!
          </h1>
          <p
            style={{
              color: "#C7D2FE",
              fontSize: "14.5px",
              margin: 0,
              maxWidth: "620px",
              lineHeight: "1.55",
            }}
          >
            {subtitle}
          </p>
        </div>

        {actionButtonText && (
          <button
            onClick={onActionClick}
            className="btn"
            style={{
              background: "#FFFFFF",
              color: "#6C4CF1",
              fontWeight: 800,
              padding: "12px 22px",
              fontSize: "14px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
            }}
          >
            <Compass size={16} />
            <span>{actionButtonText}</span>
          </button>
        )}
      </div>

      {stats.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
            gap: "20px",
            marginTop: "24px",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            position: "relative",
            zIndex: 2,
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  fontFamily: "Outfit, sans-serif",
                  color: "#FFFFFF",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "12.5px", fontWeight: 500, color: "#C7D2FE" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
