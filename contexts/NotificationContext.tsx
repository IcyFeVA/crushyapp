// contexts/NotificationContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";

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
  const [newMatches, setNewMatches] = useState(0);
  const [unreadMessages, setUnreadMessages] = useState(0);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const session = useAuth();

  useEffect(() => {
    if (session?.user) {
      const matchSubscription = subscribeToNewMatches();
      const messageSubscription = subscribeToNewMessages();

      return () => {
        supabase.removeChannel(matchSubscription);
        supabase.removeChannel(messageSubscription);
      };
    }
  }, [session?.user?.id]);

  useEffect(() => {
    setTotalNotifications(newMatches + unreadMessages);
  }, [newMatches, unreadMessages]);

  const subscribeToNewMatches = () => {
    return supabase
      .channel("matches")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "matches",
          filter: `user2_id=eq.${session.user.id}`,
        },
        (payload) => {
          setNewMatches((prev) => prev + 1);
        }
      )
      .subscribe();
  };

  const subscribeToNewMessages = () => {
    return supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          // filter: `conversation_id=in.(select conversation_id from conversation_participants where user_id=eq.${session.user.id})`,
        },
        (payload) => {
          console.log("new message", payload);

          if (payload.new.sender_id !== session.user.id) {
            setUnreadMessages((prev) => prev + 1);
          }
        }
      )
      .subscribe();
  };

  const resetNotifications = () => {
    setNewMatches(0);
    setUnreadMessages(0);
    setTotalNotifications(0);
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