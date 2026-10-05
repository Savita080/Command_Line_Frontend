import { fetchApi } from "./api";

// Check if Mock Auth Mode is enabled via environment variable
const IS_MOCK_AUTH =
  import.meta.env.VITE_USE_MOCK_AUTH === "true" ||
  import.meta.env.VITE_USE_MOCK_AUTH === true;

// Helper function to simulate network delay for mock calls
const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Authentication Service
 * Serves as the single API service gateway for auth endpoints.
 * Supports both real backend API calls and mock auth mode (toggled via VITE_USE_MOCK_AUTH env variable).
 */
export const authService = {
  /**
   * Log in with credentials.
   * @param {string} email
   * @param {string} password
   * @param {string} [role] Optional selected role hint from the UI ("student" | "club-lead" | "dsw")
   * @returns {Promise<{ user: object, token: string }>}
   */
  login: async (email, password, role = "") => {
    const trimmedEmail = email.trim().toLowerCase();

    /* ─── MOCK AUTH MODE ─────────────────────────────────────────────────── */
    if (IS_MOCK_AUTH) {
      console.info(`[AuthService] Using MOCK auth mode for ${trimmedEmail}`);
      await delay(500);

      // Simulated error case 1: Invalid credentials
      if (trimmedEmail === "fail@test.com" || password === "wrong") {
        throw new Error("Invalid email or password. Please check your credentials.");
      }

      // Simulated error case 2: Server error (500)
      if (password === "servererror") {
        const serverErr = new Error("Internal Server Error (500). Please try again later.");
        serverErr.status = 500;
        throw serverErr;
      }

      // Resolve role (defaulting to STUDENT, or mapping UI selection/email hints)
      let resolvedRole = "STUDENT";
      const normalizedRoleHint = (role || "").toLowerCase();

      if (normalizedRoleHint === "club-lead" || normalizedRoleHint === "president" || trimmedEmail.includes("lead")) {
        resolvedRole = "CLUB_HEAD";
      } else if (normalizedRoleHint === "dsw" || trimmedEmail.includes("dsw")) {
        resolvedRole = "DSW";
      } else {
        resolvedRole = "STUDENT";
      }

      // Generate a mock display name from email address
      const emailPrefix = trimmedEmail.split("@")[0] || "user";
      const mockName = emailPrefix
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

      const mockUser = {
        id: `usr_${Math.floor(Math.random() * 10000)}`,
        email: trimmedEmail,
        name: mockName,
        role: resolvedRole,
        department: "Computer Science & Engineering",
        avatarUrl: null,
      };

      const mockToken = `mock_jwt_token_${resolvedRole.toLowerCase()}_${Date.now()}`;

      return { user: mockUser, token: mockToken };
    }

    /* ─── REAL BACKEND API MODE ─────────────────────────────────────────── */
    const response = await fetchApi("/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: trimmedEmail,
        password,
        ...(role && { requestedRole: role }),
      }),
    });

    const user = response?.data?.user || response?.user || response?.data;
    const token = response?.data?.token || response?.token;

    if (!token) {
      throw new Error("Authentication succeeded but no authorization token was returned from server.");
    }

    return { user, token };
  },

  /**
   * Get current authenticated user profile / validate session token
   * @returns {Promise<object>}
   */
  getCurrentUser: async () => {
    /* ─── MOCK AUTH MODE ─────────────────────────────────────────────────── */
    if (IS_MOCK_AUTH) {
      await delay(250);
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          return JSON.parse(savedUser);
        } catch {
          // ignore parsing failure
        }
      }
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No active session token found.");
      }
      return {
        id: "usr_mock_session",
        email: "student1@gla.ac.in",
        name: "Student One",
        role: "STUDENT",
        department: "Computer Science & Engineering",
      };
    }

    /* ─── REAL BACKEND API MODE ─────────────────────────────────────────── */
    const response = await fetchApi("/auth/profile", {
      method: "GET",
    });

    return response?.data?.user || response?.user || response?.data || response;
  },

  /**
   * Sign up a new user
   */
  signup: async (userData) => {
    if (IS_MOCK_AUTH) {
      await delay(400);
      return { success: true, message: "User created successfully (Mock mode)" };
    }

    return await fetchApi("/auth/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
   * Logout helper (clears client credentials)
   */
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};
