"use client";

import {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

interface GlobalContextType {
  unreadCount: number;
  setUnreadCount: Dispatch<SetStateAction<number>>;
}

// Create context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create a provider
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("Global Context is not defined");
  return context;
}
