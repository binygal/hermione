import React from "react";

type DrawerContextType = {
  closeDrawer: () => void;
};

export const DrawerContext = React.createContext<DrawerContextType | undefined>(undefined);

export function useDrawer() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}
