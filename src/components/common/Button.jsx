import React from "react";
import { Loader2 } from "lucide-react";

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  style = {},
  ...props
}) => {
  const baseStyles = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontWeight: "600",
    borderRadius: "10px",
    transition: "all 0.2s ease-in-out",
    cursor: disabled || loading ? "not-allowed" : "pointer",
    border: "none",
    outline: "none",
    fontSize: size === "sm" ? "13px" : size === "lg" ? "16px" : "14px",
    padding:
      size === "sm"
        ? "6px 14px"
        : size === "lg"
        ? "12px 24px"
        : "9px 18px",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      background: "linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(79, 70, 229, 0.25)",
    },
    secondary: {
      background: "#F1F5F9",
      color: "#1E293B",
      border: "1px solid #E2E8F0",
    },
    outline: {
      background: "transparent",
      color: "#4F46E5",
      border: "1.5px solid #6366F1",
    },
    danger: {
      background: "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(239, 68, 68, 0.25)",
    },
    success: {
      background: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      color: "#FFFFFF",
      boxShadow: "0 4px 12px rgba(16, 185, 129, 0.25)",
    },
  };

  const currentVariant = variants[variant] || variants.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ ...baseStyles, ...currentVariant, ...style }}
      className={className}
      {...props}
    >
      {loading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : Icon ? (
        <Icon size={16} />
      ) : null}
      <span>{children}</span>
    </button>
  );
};
