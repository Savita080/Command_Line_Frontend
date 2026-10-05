import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authService } from "../services/authService";
import { setOnUnauthorizedHandler } from "../services/api";

const AuthContext = createContext(null);

/**
 * Storage Strategy Discussion:
 * - localStorage vs httpOnly Cookie:
 *   We use localStorage here because the frontend and backend are decoupled architectures
 *   and localStorage allows the SPA client to inject Bearer tokens directly into standard fetch
 *   headers without requiring server-side domain-coupled cookie configuration.
 *   (Tradeoff: localStorage can be vulnerable to XSS; httpOnly cookies mitigate XSS token theft
 *    but require CSRF defenses, specific CORS cookie settings, and backend Set-Cookie headers).
 */

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  // Loading state for initial session restore & auth verification
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const logout = useCallback(() => {
    authService.logout();
    setToken(null);
    setCurrentUser(null);
    setAuthError(null);
  }, []);

  // Register 401 Unauthorized interceptor callback from api client
  useEffect(() => {
    setOnUnauthorizedHandler(() => {
      console.warn("[Auth] Received 401 Unauthorized - logging out");
      logout();
    });
  }, [logout]);

  // Check and restore existing valid session on initial mount
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        // Validate token with backend /auth/profile
        const userProfile = await authService.getCurrentUser();
        if (isMounted) {
          setCurrentUser(userProfile);
          localStorage.setItem("user", JSON.stringify(userProfile));
        }
      } catch (err) {
        console.warn("[Auth] Stored session validation failed:", err.message);
        // If session is expired or invalid, clear stored tokens
        if (isMounted) {
          authService.logout();
          setToken(null);
          setCurrentUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  /**
   * Centralized login handler
   * @param {{ email: string, password: string, role?: string }} credentials
   */
  const login = async ({ email, password, role }) => {
    setAuthError(null);
    try {
      const { user, token: authToken } = await authService.login(email, password, role);

      // Persist to storage
      localStorage.setItem("token", authToken);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setToken(authToken);
      setCurrentUser(user);

      return { user, token: authToken };
    } catch (error) {
      setAuthError(error.message || "Failed to login. Please try again.");
      throw error;
    }
  };

  const value = {
    currentUser,
    token,
    isAuthenticated: Boolean(token && currentUser),
    loading,
    authError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
