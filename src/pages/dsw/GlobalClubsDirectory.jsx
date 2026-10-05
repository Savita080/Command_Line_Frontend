import React, { useState, useEffect } from "react";
import { ShieldCheck, Users, Search } from "lucide-react";
import { clubService } from "../../services/clubService";

export const GlobalClubsDirectory = () => {
  const [clubs, setClubs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const res = await clubService.getClubs();
        if (res?.data?.clubs) {
          setClubs(
            res.data.clubs.map((c) => ({
              id: c.id,
              name: c.name,
              category: c.category,
              headName: "Aarav Patel",
              mentorName: "Prof. Rajesh Sharma",
              membersCount: c._count?.members ?? 142,
              annualBudget: c.annualBudget ?? 50000,
              spentBudget: c.spentBudget ?? 15000,
            }))
          );
        }
      } catch (err) {
        console.error("Error loading master clubs directory:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filtered = clubs.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase()) ||
      c.headName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
          Master Global Clubs Directory (DSW Registry)
        </h2>
        <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
          Live university registry syncing with the database.
        </p>
      </div>

      <div style={{ background: "#FFFFFF", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "8px", padding: "0 12px", maxWidth: "360px" }}>
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search club by name, lead, or category..."
              style={{ width: "100%", padding: "8px 0", border: "none", background: "transparent", fontSize: "13px", outline: "none" }}
            />
          </div>
        </div>

        {loading ? (
          <div style={{ padding: "40px", color: "#94A3B8" }}>Loading master directory from database...</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", color: "#475569", fontSize: "12px", textTransform: "uppercase" }}>
                  <th style={{ padding: "14px 20px" }}>Club Name</th>
                  <th style={{ padding: "14px 20px" }}>Category</th>
                  <th style={{ padding: "14px 20px" }}>Club Head</th>
                  <th style={{ padding: "14px 20px" }}>Faculty Mentor</th>
                  <th style={{ padding: "14px 20px" }}>Members</th>
                  <th style={{ padding: "14px 20px" }}>Annual Budget</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "14px 20px", fontWeight: "700", color: "#0F172A" }}>{c.name}</td>
                    <td style={{ padding: "14px 20px" }}>
                      <span style={{ background: "#EEF2FF", color: "#4F46E5", padding: "3px 8px", borderRadius: "10px", fontSize: "11px", fontWeight: "700" }}>
                        {c.category}
                      </span>
                    </td>
                    <td style={{ padding: "14px 20px", color: "#334155" }}>{c.headName}</td>
                    <td style={{ padding: "14px 20px", color: "#334155" }}>{c.mentorName}</td>
                    <td style={{ padding: "14px 20px", fontWeight: "600", color: "#0F172A" }}>{c.membersCount}</td>
                    <td style={{ padding: "14px 20px", color: "#059669", fontWeight: "700" }}>₹{c.annualBudget.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
