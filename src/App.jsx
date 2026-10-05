import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider, useApp } from "./context/AppContext";
import { LandingPage } from "./pages/public/LandingPage";
import { LoginPage } from "./pages/public/LoginPage";
import { AuthModal } from "./pages/public/AuthModal";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Loader2, Terminal } from "lucide-react";

// Student pages
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { ExploreClubs } from "./pages/student/ExploreClubs";
import { MyClubs } from "./pages/student/MyClubs";
import { MyApplications } from "./pages/student/MyApplications";
import { CampusEvents } from "./pages/student/CampusEvents";
import { StudentProfile } from "./pages/student/StudentProfile";

// Club Lead pages
import { LeadDashboard } from "./pages/club-lead/LeadDashboard";
import { ManageClub } from "./pages/club-lead/ManageClub";
import { ReviewApplications } from "./pages/club-lead/ReviewApplications";
import { MemberRoster } from "./pages/club-lead/MemberRoster";
import { EventProposals } from "./pages/club-lead/EventProposals";
import { ClubAnalytics } from "./pages/club-lead/ClubAnalytics";

// DSW pages
import { DswDashboard } from "./pages/dsw/DswDashboard";
import { GlobalClubsDirectory } from "./pages/dsw/GlobalClubsDirectory";
import { CampusAnalytics } from "./pages/dsw/CampusAnalytics";
import { BudgetApprovals } from "./pages/dsw/BudgetApprovals";

const MainAppContent = () => {
  const { user, token, activeTab, setActiveTab, selectedRole } = useApp();
  const { loading } = useAuth();

  // Full-screen loader during initial session token check on app mount
  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          color: "#FFFFFF",
          gap: "16px",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #6C4CF1, #8A6BFF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 24px rgba(108, 76, 241, 0.4)",
          }}
        >
          <Terminal size={24} color="white" />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#94A3B8",
          }}
        >
          <Loader2 size={18} className="animate-spin" style={{ color: "#6C4CF1" }} />
          <span>Restoring CommandLine Session…</span>
        </div>
      </div>
    );
  }

  // Route /login to the dedicated login page
  if (window.location.pathname === "/login") {
    return <LoginPage />;
  }

  // If not logged in, render public Landing Page & Auth Modal
  if (!token || !user) {
    return (
      <>
        <LandingPage />
        <AuthModal />
      </>
    );
  }

  // Active Tab Title Lookup
  const titleMap = {
    dashboard: "Student Workspace Dashboard",
    explore: "Campus Club Discovery Portal",
    "my-clubs": "My Enrolled Clubs",
    "my-applications": "My Applications Tracker",
    events: "Campus Events Calendar",
    profile: "Student User Profile",

    "lead-dashboard": "Club Lead Operations Dashboard",
    "manage-club": "Manage Club Profile & Settings",
    "review-applications": "Review Membership Applications",
    "member-roster": "Club Member Roster",
    "event-proposals": "Event Proposals & Requests",
    "club-analytics": "Club Analytics & Metrics",

    "dsw-dashboard": "DSW University Governance Dashboard",
    "global-clubs": "Global Clubs Master Directory",
    "campus-analytics": "Campus-Wide Analytics & Metrics",
    "budget-approvals": "Master Budget Approvals",
  };

  const activeTitle = titleMap[activeTab] || "Workspace Dashboard";

  // Tab View Router
  const renderTabContent = () => {
    switch (activeTab) {
      // Student Workspace
      case "dashboard":
        return <StudentDashboard setActiveTab={setActiveTab} />;
      case "explore":
        return <ExploreClubs />;
      case "my-clubs":
        return <MyClubs />;
      case "my-applications":
        return <MyApplications />;
      case "events":
        return <CampusEvents />;
      case "profile":
        return <StudentProfile />;

      // Club Lead Workspace
      case "lead-dashboard":
        return <LeadDashboard setActiveTab={setActiveTab} />;
      case "manage-club":
        return <ManageClub />;
      case "review-applications":
        return <ReviewApplications />;
      case "member-roster":
        return <MemberRoster />;
      case "event-proposals":
        return <EventProposals />;
      case "club-analytics":
        return <ClubAnalytics />;

      // DSW Workspace
      case "dsw-dashboard":
        return <DswDashboard setActiveTab={setActiveTab} />;
      case "global-clubs":
        return <GlobalClubsDirectory />;
      case "campus-analytics":
        return <CampusAnalytics />;
      case "budget-approvals":
        return <BudgetApprovals />;

      default:
        return <StudentDashboard setActiveTab={setActiveTab} />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      activeTabTitle={activeTitle}
    >
      {renderTabContent()}
      <AuthModal />
    </DashboardLayout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </AuthProvider>
  );
}

export default App;