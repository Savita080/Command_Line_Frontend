import React, { useState } from "react";
import {
  Terminal,
  GraduationCap,
  Crown,
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Input } from "../../components/common/Input";

/* ─── Role definitions ─────────────────────────────────────────────────────
 * Internal UI representations only — not wired to backend enums yet.
 * Backend role wiring happens in the authentication step.
 */
const ROLES = [
  {
    id: "student",
    label: "Student",
    subtitle: "Discover clubs, apply & track campus events",
    icon: GraduationCap,
    accent: "#6C4CF1",
    bg: "#F0EEFF",
    border: "#C4B5FD",
  },
  {
    id: "club-lead",
    label: "Club Head",
    subtitle: "Manage your club, review applications & propose events",
    icon: Crown,
    accent: "#D97706",
    bg: "#FEF3C7",
    border: "#FDE68A",
  },
  {
    id: "dsw",
    label: "DSW",
    subtitle: "Campus analytics, club registry & budget oversight",
    icon: Building2,
    accent: "#059669",
    bg: "#ECFDF5",
    border: "#A7F3D0",
  },
];

/* ─── Validation helper ─────────────────────────────────────────────────── */
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

import { useAuth } from "../../context/AuthContext";

/* ═══════════════════════════════════════════════════════════════════════════
   ROLE SELECTION SCREEN
══════════════════════════════════════════════════════════════════════════════*/
const RoleSelection = ({ onSelect }) => (
  <div>
    <div style={{ marginBottom: "28px" }}>
      <h1 style={{ fontSize: "22px", fontWeight: 800, color: "#0F172A", margin: "0 0 6px 0", letterSpacing: "-0.02em" }}>
        Sign in to CommandLine
      </h1>
      <p style={{ color: "#64748B", fontSize: "13.5px", margin: 0 }}>
        Choose your role to continue to your portal.
      </p>
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {ROLES.map((role) => {
        const Icon = role.icon;
        return (
          <button
            key={role.id}
            id={`role-btn-${role.id}`}
            onClick={() => onSelect(role)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "15px 16px",
              borderRadius: "14px",
              border: "1.5px solid #E2E8F0",
              background: "#FFFFFF",
              cursor: "pointer",
              textAlign: "left",
              transition: "border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = role.border;
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(0,0,0,0.07)";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#E2E8F0";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            <div style={{
              width: "44px", height: "44px", borderRadius: "11px",
              background: role.bg, display: "flex", alignItems: "center",
              justifyContent: "center", flexShrink: 0,
            }}>
              <Icon size={21} color={role.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#0F172A", marginBottom: "2px" }}>
                {role.label}
              </div>
              <div style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.4 }}>
                {role.subtitle}
              </div>
            </div>
            <ArrowRight size={15} color="#CBD5E1" style={{ flexShrink: 0 }} />
          </button>
        );
      })}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════════
   LOGIN FORM SCREEN
══════════════════════════════════════════════════════════════════════════════*/
const LoginForm = ({ role, onBack }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });
  // idle | loading | success | error
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);

  const Icon = role.icon;
  const isLoading = status === "loading";

  const validate = () => {
    const errs = { email: "", password: "" };
    if (!email.trim()) errs.email = "Email is required.";
    else if (!isValidEmail(email)) errs.email = "Enter a valid email address.";
    if (!password) errs.password = "Password is required.";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters.";
    setFieldErrors(errs);
    return !errs.email && !errs.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await login({
        email: email.trim(),
        password,
        role: role.id,
      });

      setLoggedInUser(result?.user || { email: email.trim() });
      setStatus("success");
      console.log("[LoginPage] Real login success:", result);
    } catch (err) {
      console.error("[LoginPage] Login failed:", err);
      setStatus("error");
      setErrorMessage(
        err.message || "Invalid credentials or unable to reach the authentication server."
      );
    }
  };

  const handleChange = (field, value) => {
    if (field === "email") setEmail(value);
    else setPassword(value);
    if (fieldErrors[field]) setFieldErrors((p) => ({ ...p, [field]: "" }));
    if (status !== "idle" && status !== "loading") setStatus("idle");
  };

  return (
    <div>
      {/* Back */}
      <button
        id="login-back-btn"
        onClick={onBack}
        disabled={isLoading}
        style={{
          display: "inline-flex", alignItems: "center", gap: "5px",
          background: "none", border: "none", color: "#64748B",
          fontSize: "13px", fontWeight: 600, cursor: isLoading ? "not-allowed" : "pointer",
          padding: "0 0 22px 0", opacity: isLoading ? 0.5 : 1, transition: "color 0.15s",
        }}
        onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.color = "#6C4CF1"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#64748B"; }}
      >
        <ArrowLeft size={14} /> Back to role selection
      </button>

      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{
          width: "44px", height: "44px", borderRadius: "12px",
          background: role.bg, display: "flex", alignItems: "center",
          justifyContent: "center", marginBottom: "14px",
        }}>
          <Icon size={21} color={role.accent} />
        </div>
        <h1 style={{ fontSize: "21px", fontWeight: 800, color: "#0F172A", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>
          {role.label} Sign In
        </h1>
        <p style={{ color: "#64748B", fontSize: "13px", margin: 0 }}>{role.subtitle}</p>
      </div>

      {/* Status banner */}
      {status === "success" && (
        <div role="status" style={{
          display: "flex", flexDirection: "column", gap: "4px",
          background: "#F0FDF4", border: "1px solid #BBF7D0", color: "#15803D",
          padding: "10px 14px", borderRadius: "10px", fontSize: "13px",
          fontWeight: 600, marginBottom: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <CheckCircle2 size={16} />
            <span>Authenticated successfully!</span>
          </div>
          <span style={{ fontSize: "12px", fontWeight: 400, color: "#166534" }}>
            Logged in as <strong>{loggedInUser?.name || loggedInUser?.email || email}</strong>
            {loggedInUser?.role ? ` (${loggedInUser.role})` : ""}
          </span>
        </div>
      )}
      {status === "error" && (
        <div role="alert" style={{
          display: "flex", alignItems: "flex-start", gap: "9px",
          background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626",
          padding: "10px 14px", borderRadius: "10px", fontSize: "13px",
          fontWeight: 500, lineHeight: 1.4, marginBottom: "16px",
        }}>
          <AlertCircle size={15} style={{ flexShrink: 0, marginTop: "2px" }} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form id="login-form" onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <Input
          id="login-email"
          label="Email Address"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => handleChange("email", e.target.value)}
          error={fieldErrors.email}
          icon={Mail}
          autoComplete="email"
          disabled={isLoading}
        />

        {/* Password wrapper for show/hide toggle */}
        <div style={{ position: "relative" }}>
          <Input
            id="login-password"
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => handleChange("password", e.target.value)}
            error={fieldErrors.password}
            icon={Lock}
            autoComplete="current-password"
            disabled={isLoading}
          />
          <button
            type="button"
            id="toggle-password-visibility"
            onClick={() => setShowPassword((v) => !v)}
            disabled={isLoading}
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{
              position: "absolute",
              right: "13px",
              bottom: fieldErrors.password ? "28px" : "11px",
              background: "none", border: "none", cursor: "pointer",
              color: "#94A3B8", padding: "0", display: "flex", alignItems: "center",
            }}
          >
            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>

        {/* Submit */}
        <button
          id="login-submit-btn"
          type="submit"
          disabled={isLoading || status === "success"}
          style={{
            width: "100%", padding: "13px 20px", marginTop: "6px",
            borderRadius: "12px",
            background: status === "success"
              ? "#DCFCE7"
              : "linear-gradient(135deg, #6C4CF1 0%, #8A6BFF 100%)",
            color: status === "success" ? "#15803D" : "#FFFFFF",
            fontWeight: 700, fontSize: "15px", border: "none",
            cursor: isLoading || status === "success" ? "not-allowed" : "pointer",
            boxShadow: status === "success" ? "none" : "0 4px 14px rgba(108, 76, 241, 0.3)",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transition: "box-shadow 0.2s ease",
            opacity: isLoading ? 0.88 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isLoading && status !== "success")
              e.currentTarget.style.boxShadow = "0 8px 22px rgba(108, 76, 241, 0.4)";
          }}
          onMouseLeave={(e) => {
            if (!isLoading && status !== "success")
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(108, 76, 241, 0.3)";
          }}
        >
          {isLoading ? (
            <><Loader2 size={16} className="animate-spin" /><span>Signing in…</span></>
          ) : status === "success" ? (
            <><CheckCircle2 size={16} /><span>Signed In</span></>
          ) : (
            <><span>Sign In</span><ArrowRight size={16} /></>
          )}
        </button>
      </form>

      {/* Demo helper hint */}
      <p style={{ marginTop: "16px", fontSize: "11.5px", color: "#94A3B8", textAlign: "center", lineHeight: 1.5 }}>
        Connected to backend auth API (<code style={{ background: "#F1F5F9", padding: "1px 5px", borderRadius: "4px" }}>/api/auth/login</code>).
        Official university domain: <code style={{ background: "#F1F5F9", padding: "1px 5px", borderRadius: "4px" }}>@gla.ac.in</code>.
      </p>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE SHELL
══════════════════════════════════════════════════════════════════════════════*/
export const LoginPage = () => {
  // screen: "role-select" or a role object { id, label, icon, ... }
  const [screen, setScreen] = useState("role-select");

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FD", display: "flex", flexDirection: "column" }}>
      {/* Minimal header */}
      <header style={{ padding: "18px 5%", display: "flex", alignItems: "center" }}>
        <a
          id="login-logo-link"
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #6C4CF1, #8A6BFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(108, 76, 241, 0.25)",
          }}>
            <Terminal size={18} color="white" />
          </div>
          <span style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>
            CommandLine
          </span>
        </a>
      </header>

      {/* Centered card */}
      <main style={{
        flex: 1, display: "flex", alignItems: "center",
        justifyContent: "center", padding: "20px 20px 56px",
      }}>
        <div style={{
          width: "100%", maxWidth: "430px",
          background: "#FFFFFF", borderRadius: "20px",
          border: "1px solid #E8EAF0",
          boxShadow: "0 8px 32px rgba(15, 23, 42, 0.08)",
          padding: "32px 28px",
        }}>
          {screen === "role-select" ? (
            <RoleSelection onSelect={(role) => setScreen(role)} />
          ) : (
            <LoginForm
              role={screen}
              onBack={() => setScreen("role-select")}
            />
          )}
        </div>
      </main>

      <footer style={{ textAlign: "center", paddingBottom: "20px" }}>
        <p style={{ fontSize: "11.5px", color: "#94A3B8", margin: 0 }}>
          © 2026 CommandLine · University Club Management Platform
        </p>
      </footer>
    </div>
  );
};
