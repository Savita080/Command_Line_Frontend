import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { currentUser, token, logout: authLogout } = useAuth();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedClubForDetails, setSelectedClubForDetails] = useState(null);

  const [selectedRole, setSelectedRole] = useState("student");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Sync role and active tab whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      const r = (currentUser?.role || "STUDENT").toUpperCase();
      if (r === "CLUB_HEAD" || r === "MENTOR") {
        setSelectedRole("president");
        setActiveTab("lead-dashboard");
      } else if (r === "DSW") {
        setSelectedRole("dsw");
        setActiveTab("dsw-dashboard");
      } else {
        setSelectedRole("student");
        setActiveTab("dashboard");
      }
    } else {
      setSelectedRole("student");
      setActiveTab("dashboard");
    }
  }, [currentUser]);

  const switchRole = (role) => {
    setSelectedRole(role);
    const r = (role || "STUDENT").toUpperCase();
    if (r === "CLUB_HEAD" || r === "MENTOR" || role === "president") {
      setActiveTab("lead-dashboard");
    } else if (r === "DSW" || role === "dsw") {
      setActiveTab("dsw-dashboard");
    } else {
      setActiveTab("dashboard");
    }
  };

  const logout = () => {
    authLogout();
    setSelectedRole("student");
    setActiveTab("dashboard");
  };

  const value = {
    isAuthModalOpen,
    setIsAuthModalOpen,
    selectedClubForDetails,
    setSelectedClubForDetails,
    selectedRole,
    switchRole,
    activeTab,
    setActiveTab,
    user: currentUser,
    currentUser,
    token,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => useContext(AppContext);