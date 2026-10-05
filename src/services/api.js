/**
 * Centralized API client wrapper.
 * - Resolves base URL from Vite environment variable (VITE_API_BASE_URL).
 * - Attaches Bearer authorization token if present in localStorage.
 * - Handles response parsing and basic error interception (e.g. 401 triggers unauthorized event).
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Handler callback for 401 Unauthorized responses to trigger logout
let unauthorizedHandler = null;

export const setOnUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

export const fetchApi = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
  };

  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}${endpoint}`;

  let response;
  try {
    response = await fetch(url, config);
  } catch (netError) {
    // Network failure (e.g. backend server offline / unreachable, CORS preflight failure)
    console.error(
      `[API Client] Backend Server Unreachable at [${options.method || "GET"} ${url}]. ` +
      `Ensure the API server is running or enable VITE_USE_MOCK_AUTH=true in .env for mock auth mode.`
    );
    const unreachableError = new Error(
      `Backend server is unreachable. Please verify backend server is running at ${BASE_URL} or enable VITE_USE_MOCK_AUTH=true.`
    );
    unreachableError.isNetworkError = true;
    unreachableError.cause = netError;
    throw unreachableError;
  }

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    const errorMessage =
      data?.message ||
      data?.error ||
      `Request failed with status ${response.status} (${response.statusText})`;

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};
