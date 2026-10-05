import { fetchApi } from "./api";

export const eventService = {
  getEvents: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/events?${query}` : "/events";
    return await fetchApi(endpoint, { method: "GET" });
  },

  getPastEvents: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/events/past?${query}` : "/events/past";
    return await fetchApi(endpoint, { method: "GET" });
  },

  createEventProposal: async (eventData) => {
    return await fetchApi("/events/request", {
      method: "POST",
      body: JSON.stringify(eventData),
    });
  },

  getPendingEvents: async () => {
    return await fetchApi("/events/pending", { method: "GET" });
  },

  reviewEvent: async (eventId, status, reviewNotes = "") => {
    return await fetchApi(`/events/${eventId}/review`, {
      method: "PATCH",
      body: JSON.stringify({ status, reviewNotes }),
    });
  },
};
