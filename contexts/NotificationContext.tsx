// contexts/NotificationContext.ts
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRealtimeSubscriptions } from "@/hooks/useRealtimeSubscriptions";

interface NotificationContextType {
  totalNotifications: number;
  newMatches: number;
  unreadMessages: number;
  resetNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { newMatches, unreadMessages } = useRealtimeSubscriptions();
  const [totalNotifications, setTotalNotifications] = useState(0);

  useEffect(() => {
    setTotalNotifications(newMatches + unreadMessages);
  }, [newMatches, unreadMessages]);

  const resetNotifications = () => {
    setTotalNotifications(0);
    // You might want to add logic here to reset newMatches and unreadMessages as well
  };

  const value = {
    totalNotifications,
    newMatches,
    unreadMessages,
    resetNotifications,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};
