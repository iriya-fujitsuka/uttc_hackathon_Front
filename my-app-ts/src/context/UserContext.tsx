import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
  userId: string | null;
  userName: string | null;
  setUserId: (id: string | null) => void;
  setUserName: (name: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  return (
    <UserContext.Provider value={{ userId, setUserId, userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}; 