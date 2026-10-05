import React, { forwardRef } from "react";

/**
 * Input — reusable form input with icon, label, and accessible error display.
 *
 * Props:
 *  id          string   — required for label+aria wiring
 *  label       string   — visible label above the field
 *  error       string   — inline error message (also sets aria-invalid)
 *  icon        node     — optional leading icon element
 *  ...rest              — passed directly to <input>
 */
export const Input = forwardRef(
  ({ id, label, error, icon: Icon, className = "", style = {}, ...rest }, ref) => {
    const errorId = error ? `${id}-error` : undefined;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {label && (
          <label
            htmlFor={id}
            style={{
              fontSize: "13px",
              fontWeight: 700,
              color: "#334155",
              userSelect: "none",
            }}
          >
            {label}
          </label>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: `1.5px solid ${error ? "#FECACA" : "#E2E8F0"}`,
            borderRadius: "10px",
            padding: "0 14px",
            background: error ? "#FFF8F8" : "#F8FAFC",
            transition: "border-color 0.15s ease, box-shadow 0.15s ease",
          }}
          onFocusCapture={(e) => {
            e.currentTarget.style.borderColor = error ? "#F87171" : "#6C4CF1";
            e.currentTarget.style.boxShadow = error
              ? "0 0 0 3px rgba(239,68,68,0.1)"
              : "0 0 0 3px rgba(108,76,241,0.12)";
          }}
          onBlurCapture={(e) => {
            e.currentTarget.style.borderColor = error ? "#FECACA" : "#E2E8F0";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {Icon && (
            <span
              style={{
                color: error ? "#F87171" : "#94A3B8",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <Icon size={17} />
            </span>
          )}
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={errorId}
            style={{
              width: "100%",
              padding: "11px 0",
              border: "none",
              background: "transparent",
              fontSize: "14px",
              color: "#0F172A",
              outline: "none",
              ...style,
            }}
            className={className}
            {...rest}
          />
        </div>

        {error && (
          <span
            id={errorId}
            role="alert"
            style={{
              fontSize: "12px",
              color: "#DC2626",
              fontWeight: 500,
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
