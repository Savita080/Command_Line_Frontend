import { fetchApi } from "./api";

export const adminService = {
  getDashboardStats: async () => {
    return await fetchApi("/admin/dashboard/stats", { method: "GET" });
  },

  getMasterBudgets: async () => {
    return await fetchApi("/admin/budgets", { method: "GET" });
  },

  broadcastAnnouncement: async (announcementData) => {
    return await fetchApi("/admin/announcements", {
      method: "POST",
      body: JSON.stringify(announcementData),
    });
  },

  getFilteredList: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/admin/filtered-list?${query}` : "/admin/filtered-list";
    return await fetchApi(endpoint, { method: "GET" });
  },
};
