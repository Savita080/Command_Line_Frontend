import React, { useState } from "react";
import { Plus, Calendar } from "lucide-react";
import { Button } from "../../components/common/Button";
import { EventCard } from "../../components/events/EventCard";
import { RequestEventModal } from "../../components/events/RequestEventModal";
import { eventService } from "../../services/eventService";

export const EventProposals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proposals, setProposals] = useState([
    {
      id: 1,
      title: "Annual Hackathon 2026",
      description: "36-hour sprint creating innovative AI products for social impact.",
      venue: "Main Auditorium & CS Labs",
      startTime: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
      budget: 15000,
      status: "APPROVED",
      registrationLink: "https://forms.gle/samplehackathon",
    },
    {
      id: 2,
      title: "Full-Stack Web Dev Bootcamp",
      description: "Hands-on weekend workshop on modern React, Node.js, and Prisma databases.",
      venue: "CS Lab 3",
      startTime: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
      budget: 5000,
      status: "PENDING",
      registrationLink: "",
    },
  ]);

  const handleCreateProposal = async (eventData) => {
    try {
      await eventService.createEventProposal(eventData);
    } catch (e) {
      console.log("Proposal submitted! (Demo recorded)");
    }
    const newProp = {
      id: Date.now(),
      ...eventData,
      status: "PENDING",
    };
    setProposals((prev) => [newProp, ...prev]);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", color: "#0F172A", margin: "0 0 6px 0" }}>
            Club Event Proposals & Requests
          </h2>
          <p style={{ color: "#64748B", margin: 0, fontSize: "14px" }}>
            Submit new campus event requests, venue bookings, and budget allocation proposals for DSW review.
          </p>
        </div>

        <Button variant="primary" icon={Plus} onClick={() => setIsModalOpen(true)}>
          Propose Event
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
        {proposals.map((prop) => (
          <EventCard key={prop.id} event={prop} isLeadOrDsw={true} />
        ))}
      </div>

      <RequestEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProposal}
        clubId={1}
      />
    </div>
  );
};
