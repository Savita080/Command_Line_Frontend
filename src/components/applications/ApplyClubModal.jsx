import React, { useState } from "react";
import { X, Send, Award, CheckCircle } from "lucide-react";
import { Button } from "../common/Button";

export const ApplyClubModal = ({ isOpen, onClose, onSubmit, club }) => {
  const [statement, setStatement] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen || !club) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!statement.trim()) {
      setError("Please write a brief statement on why you want to join this club.");
      return;
    }

    setLoading(true);

    try {
      await onSubmit(club.id, statement.trim());
      setStatement("");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.6)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#FFFFFF",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "480px",
          padding: "28px",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "#F1F5F9",
            border: "none",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748B",
          }}
        >
          <X size={18} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <img
            src={club.logoUrl || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=200"}
            alt={club.name}
            style={{ width: "48px", height: "48px", borderRadius: "12px", objectFit: "cover" }}
          />
          <div>
            <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
              Apply to {club.name}
            </h3>
            <span style={{ fontSize: "12px", color: "#4F46E5", fontWeight: "600" }}>
              Category: {club.category}
            </span>
          </div>
        </div>

        {error && (
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "18px" }}>
            <label
              style={{
                fontSize: "13px",
                fontWeight: "600",
                color: "#334155",
                display: "block",
                marginBottom: "6px",
              }}
            >
              Statement of Purpose / Why do you want to join? *
            </label>
            <textarea
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              placeholder="Tell the club lead team about your skills, interests, and how you can contribute..."
              rows={4}
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "10px",
                border: "1px solid #CBD5E1",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
              required
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <Button variant="secondary" onClick={onClose} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" loading={loading} icon={Send} style={{ flex: 1 }}>
              Submit Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
