import { createContext, useContext, useState } from "react";
import { authService } from "../services/authService";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [activeTab, setActiveTabState] = useState("Dashboard");
  const [subView, setSubView] = useState(null); // null (list), 'create', 'details'
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Auth States
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [authView, setAuthView] = useState("login"); // "login", "register", "forgot-password", "verify-email"
  const [emailToVerify, setEmailToVerify] = useState("");

  const setActiveTab = (tab) => {
    setActiveTabState(tab);
    setSubView(null);
    setSelectedItemId(null);
    setSearchQuery("");
  };

  const navigateToDetails = (itemId) => {
    setSelectedItemId(itemId);
    setSubView("details");
  };

  const navigateToCreate = () => {
    setSubView("create");
  };

  const navigateToList = () => {
    setSubView(null);
    setSelectedItemId(null);
  };

  const login = (email, password) => {
    const loggedInUser = authService.login(email, password);
    setUser(loggedInUser);
    setActiveTab("Dashboard");
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setAuthView("login");
  };

  return (
    <NavigationContext.Provider
      value={{
        activeTab,
        setActiveTab,
        subView,
        setSubView,
        selectedItemId,
        setSelectedItemId,
        navigateToDetails,
        navigateToCreate,
        navigateToList,
        searchQuery,
        setSearchQuery,
        
        // Auth context values
        user,
        setUser,
        authView,
        setAuthView,
        emailToVerify,
        setEmailToVerify,
        login,
        logout
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
