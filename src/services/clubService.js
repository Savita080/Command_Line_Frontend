import { fetchApi } from "./api";

export const clubService = {
  getClubs: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/clubs?${query}` : "/clubs";
    return await fetchApi(endpoint, { method: "GET" });
  },

  getClubDetails: async (clubId) => {
    return await fetchApi(`/clubs/${clubId}/details`, { method: "GET" });
  },

  applyToClub: async (clubId, statement) => {
    return await fetchApi(`/clubs/${clubId}/apply`, {
      method: "POST",
      body: JSON.stringify({ statement }),
    });
  },

  getClubApplications: async (clubId) => {
    return await fetchApi(`/clubs/${clubId}/application`, { method: "GET" });
  },

  reviewApplication: async (clubId, applicationId, status, reviewNotes = "") => {
    return await fetchApi(`/clubs/${clubId}/application/${applicationId}`, {
      method: "PATCH",
      body: JSON.stringify({ status, reviewNotes }),
    });
  },

  manageMembers: async (clubId, userId, action, role = "STUDENT") => {
    return await fetchApi(`/clubs/${clubId}/members`, {
      method: "PATCH",
      body: JSON.stringify({ userId, action, role }),
    });
  },
};
