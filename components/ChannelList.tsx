// components/tabs/inbox.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/api/supabaseApi";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { useTabFocus } from "@/hooks/useTabFocus";
import { useNotifications } from "@/hooks/useNotifications";

const Tab = createMaterialTopTabNavigator();

type Conversation = {
  conversation_id: string;
  user2_id: string;
  other_user_name: string;
  last_message: string;
  last_message_time: string;
};

type Match = {
  id: string;
  user2_id: string;
  other_user_name: string;
  created_at: string;
};

const startConversationForMatch = async (matchId: string) => {
  const { data, error } = await supabase.rpc("create_conversation_for_match", {
    match_id: matchId,
  });

  if (error) throw error;

  return data; // This will be the conversation_id
};

function MatchesTab({ refreshKey, refresh }) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const session = useAuth();
  const { newMatches } = useNotifications();

  useEffect(() => {
    if (newMatches > 0) {
      fetchMatches();
    }
  }, [newMatches]);

  useEffect(() => {
    if (session?.user) {
      fetchMatches();
    }
  }, [session, refreshKey]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("matches")
        .select(
          `
          id,
          user2_id,
          profiles_test!matches_user2_id_fkey(name),
          created_at
        `
        )
        .eq("user1_id", session.user.id)
        .is("conversation_id", null);

      if (error) throw error;

      setMatches(
        data.map((match) => ({
          ...match,
          other_user_name: match.profiles_test.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartConversation = async (
    matchId: string,
    otherUserId: string,
    otherUserName: string
  ) => {
    try {
      const { data, error } = await supabase.rpc(
        "create_conversation_for_match",
        {
          match_id: matchId,
        }
      );

      if (error) throw error;

      if (data) {
        navigation.navigate("ChatChannel", {
          conversationId: data,
          otherUserId,
          otherUserName,
        });
        refresh(); // This will trigger a refresh of both tabs
      } else {
        console.error("No conversation ID returned");
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };
  const renderMatchItem = ({ item }: { item: Match }) => (
    <View style={styles.matchItem}>
      <Text style={styles.userName}>{item.other_user_name}</Text>
      <Text style={styles.matchedAt}>
        created on {new Date(item.created_at).toLocaleDateString()}
      </Text>
      <Pressable
        style={styles.startChatButton}
        onPress={() =>
          handleStartConversation(item.id, item.user2_id, item.other_user_name)
        }
      >
        <Text style={styles.startChatButtonText}>Start Chat</Text>
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading matches...</Text>
      </View>
    );
  }

  return (
    <View style={defaultStyles.innerContainer}>
      {matches.length > 0 ? (
        <FlatList
          data={matches}
          renderItem={renderMatchItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.noMatchesText}>No new matches</Text>
      )}
    </View>
  );
}

function ChatsTab({ refreshKey, refresh }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const session = useAuth();
  const { unreadMessages } = useNotifications();

  React.useEffect(() => {
    if (unreadMessages > 0) {
      fetchConversations();
    }
  }, [unreadMessages]);

  useEffect(() => {
    if (session?.user) {
      fetchConversations();
    }
  }, [session, refreshKey]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await api.getRecentConversations(session.user.id);
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <Pressable
      style={styles.conversationItem}
      onPress={() =>
        navigation.navigate("ChatChannel", {
          conversationId: item.conversation_id,
          otherUserId: item.user2_id,
          otherUserName: item.other_user_name,
        })
      }
    >
      <Text style={styles.userName}>{item.other_user_name}</Text>
      <Text style={styles.lastMessage}>{item.last_message}</Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading conversations...</Text>
      </View>
    );
  }

  return (
    <View style={defaultStyles.innerContainer}>
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item) => item.conversation_id}
        />
      ) : (
        <Text style={styles.noConversationsText}>No conversations yet</Text>
      )}
    </View>
  );
}

export default function Inbox() {
  const { newMatches, unreadMessages, resetNotifications } = useNotifications();

  React.useEffect(() => {
    // Reset notifications when entering the Inbox
    if (resetNotifications) {
      resetNotifications();
    }
  }, [resetNotifications]);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Matches"
        component={MatchesTab}
        options={{
          tabBarBadge: newMatches > 0 ? newMatches : undefined,
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsTab}
        options={{
          tabBarBadge: unreadMessages > 0 ? unreadMessages : undefined,
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  matchItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tertiary,
  },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tertiary,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  matchedAt: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginBottom: 10,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.light.textSecondary,
  },
  startChatButton: {
    backgroundColor: Colors.light.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  startChatButtonText: {
    color: Colors.light.textInverted,
    fontWeight: "bold",
  },
  noMatchesText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  noConversationsText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});
