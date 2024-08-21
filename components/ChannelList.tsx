import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/api/supabaseApi";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { supabase } from "@/lib/supabase";
import { useTabFocus } from "@/hooks/useTabFocus";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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

function MatchesTab() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const session = useAuth();
  const { refreshKey, refresh } = useTabFocus();

  const fetchMatches = useCallback(async () => {
    if (!session?.user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("matches")
        .select(
          `
          id,
          user2_id,
          profiles_test!matches_user2_id_fkey(name),
          created_at,
          conversation_id
        `
        )
        .eq("user1_id", session.user.id)
        .not("matched_at", "is", null)
        .order("matched_at", { ascending: false });

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
  }, [session]);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches, refreshKey]);

  const handleStartConversation = async (
    matchId: string,
    otherUserId: string,
    otherUserName: string,
    existingConversationId: string | null
  ) => {
    try {
      let conversationId = existingConversationId;

      if (!conversationId) {
        const { data, error } = await supabase.rpc(
          "create_conversation_for_match",
          {
            match_id: matchId,
          }
        );

        if (error) throw error;
        conversationId = data;
      }

      if (conversationId) {
        navigation.navigate("ChatChannel", {
          conversationId,
          otherUserId,
          otherUserName,
        });
        fetchMatches(); // Refresh the matches list
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
        Matched on {new Date(item.created_at).toLocaleDateString()}
      </Text>
      <Pressable
        style={styles.startChatButton}
        onPress={() =>
          handleStartConversation(
            item.id,
            item.user2_id,
            item.other_user_name,
            item.conversation_id
          )
        }
      >
        <Text style={styles.startChatButtonText}>
          {item.conversation_id ? "Continue Chat" : "Start Chat"}
        </Text>
      </Pressable>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
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
        <Text style={styles.noMatchesText}>Nothing new here...</Text>
      )}
    </View>
  );
}

function ChatsTab() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const session = useAuth();
  const { refreshKey, refresh } = useTabFocus();
  const conversationIdsRef = useRef<string[]>([]);

  useEffect(() => {
    if (session?.user) {
      fetchConversations();
      const subscription = subscribeToUserConversations();
      return () => {
        if (subscription) {
          supabase.removeChannel(subscription);
        }
      };
    }
  }, [session, refreshKey]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await api.getRecentConversations(session.user.id);
      setConversations(data);
      conversationIdsRef.current = data.map((conv) => conv.conversation_id);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    } finally {
      setLoading(false);
    }
  };

  const subscribeToUserConversations = () => {
    return supabase
      .channel("user-conversations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=in.(${conversationIdsRef.current.join(
            ","
          )})`,
        },
        handleNewMessage
      )
      .subscribe();
  };

  const handleNewMessage = async (payload) => {
    const updatedConversation = await api.getConversation(
      payload.new.conversation_id
    );
    setConversations((prevConversations) => {
      const index = prevConversations.findIndex(
        (conv) => conv.conversation_id === payload.new.conversation_id
      );
      if (index !== -1) {
        const newConversations = [...prevConversations];
        newConversations[index] = updatedConversation;
        return newConversations;
      } else {
        return [updatedConversation, ...prevConversations];
      }
    });
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
      <Text numberOfLines={1} style={styles.lastMessage}>
        {item.last_message}
      </Text>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={{
          tabBarScrollEnabled: false,
          tabBarInactiveTintColor: Colors.light.text,
          tabBarActiveTintColor: Colors.light.text,
          tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.light.text,
            height: 2,
          },
          tabBarAndroidRipple: { borderless: false },
          swipeEnabled: true,
        }}
      >
        <Tab.Screen name="Matches" component={MatchesTab} />
        <Tab.Screen name="Chats" component={ChatsTab} />
      </Tab.Navigator>
    </GestureHandlerRootView>
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
    backgroundColor: Colors.light.white,
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
