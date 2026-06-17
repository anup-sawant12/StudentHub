import { createContext, useContext, useState } from "react";

const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [activeTab, setActiveTabState] = useState("Dashboard");
  const [subView, setSubView] = useState(null); // null (list), 'create', 'details'
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

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
