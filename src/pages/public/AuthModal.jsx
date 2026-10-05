import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import { X, Lock, Mail, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, switchRole } = useApp();
  const { login } = useAuth();

  const [email, setEmail] = useState("student1@gla.ac.in");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAuthModalOpen) {
      setError("");
      setLoading(false);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    if (!loading) {
      setIsAuthModalOpen(false);
      setError("");
    }
  };

  const setPresetCredentials = (presetEmail) => {
    setEmail(presetEmail);
    setPassword("password123");
    setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Email Domain Validation (@gla.ac.in requirement)
    if (!trimmedEmail.endsWith("@gla.ac.in")) {
      setError("Email validation failed: Official email must end with @gla.ac.in");
      return;
    }

    setLoading(true);

    try {
      const result = await login({
        email: trimmedEmail,
        password: password,
      });

      const loggedInUser = result?.user;
      if (loggedInUser?.role) {
        switchRole(loggedInUser.role);
      }
      setIsAuthModalOpen(false);
      setLoading(false);
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      setError(err.message || "Cannot connect to backend server. Please verify backend is running on port 5000.");
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(15, 23, 42, 0.65)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "20px",
      }}
    >
      <div
        className="auth-modal-container"
        style={{
          maxWidth: "480px",
          width: "100%",
          background: "#FFFFFF",
          borderRadius: "24px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          padding: "32px",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={loading}
          style={{
            position: "absolute",
            top: "24px",
            right: "24px",
            background: "#F1F5F9",
            border: "none",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: loading ? "not-allowed" : "pointer",
            color: "#64748B",
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "16px",
              boxShadow: "0 8px 16px rgba(79, 70, 229, 0.25)",
            }}
          >
            <ShieldCheck size={24} color="#FFFFFF" />
          </div>

          <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0" }}>
            CommandLine Portal Authentication
          </h2>
          <p style={{ color: "#64748B", fontSize: "14px", margin: 0 }}>
            Enter your official <strong>@gla.ac.in</strong> email credentials. Role authorization (RBAC) is resolved automatically.
          </p>
        </div>

        {/* Preset Quick Fill Chips */}
        <div style={{ marginBottom: "20px" }}>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "8px" }}>
            DEMO PRESET ACCOUNTS (@gla.ac.in)
          </span>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setPresetCredentials("student1@gla.ac.in")}
              style={{
                padding: "5px 10px",
                borderRadius: "16px",
                border: "1px solid #C7D2FE",
                background: "#EEF2FF",
                color: "#4F46E5",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Student
            </button>

            <button
              type="button"
              onClick={() => setPresetCredentials("lead.tech@gla.ac.in")}
              style={{
                padding: "5px 10px",
                borderRadius: "16px",
                border: "1px solid #FDE68A",
                background: "#FEF3C7",
                color: "#D97706",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Club Head
            </button>

            <button
              type="button"
              onClick={() => setPresetCredentials("dsw@gla.ac.in")}
              style={{
                padding: "5px 10px",
                borderRadius: "16px",
                border: "1px solid #A7F3D0",
                background: "#ECFDF5",
                color: "#059669",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              DSW Admin
            </button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              border: "1px solid #FECACA",
              color: "#DC2626",
              padding: "10px 14px",
              borderRadius: "10px",
              fontSize: "13px",
              marginBottom: "18px",
              lineHeight: "1.4",
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
              University Email Address (@gla.ac.in) *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid #CBD5E1",
                borderRadius: "10px",
                padding: "0 14px",
                background: "#F8FAFC",
              }}
            >
              <Mail size={18} color="#94A3B8" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@gla.ac.in"
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  background: "transparent",
                  fontSize: "14px",
                  outline: "none",
                }}
                required
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: "13px", fontWeight: 700, color: "#334155", display: "block", marginBottom: "6px" }}>
              Password *
            </label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                border: "1px solid #CBD5E1",
                borderRadius: "10px",
                padding: "0 14px",
                background: "#F8FAFC",
              }}
            >
              <Lock size={18} color="#94A3B8" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 0",
                  border: "none",
                  background: "transparent",
                  fontSize: "14px",
                  outline: "none",
                }}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px 20px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "15px",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 14px rgba(79, 70, 229, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {loading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <span>Authenticate & Enter Portal</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};