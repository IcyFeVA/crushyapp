import React, { useCallback, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { connectUser } from "@/lib/streamChat";
import { useChatContext, ChannelList } from "stream-chat-expo";
import { StreamChat } from "stream-chat";
import { ActivityIndicator } from "react-native";

type Match = {
  id: string;
  name: string;
  avatar_url: string;
};

export default function Inbox() {
  const [matches, setMatches] = useState<Match[]>([]);
  const navigation = useNavigation();
  const session = useAuth();
  const { client } = useChatContext();
  const [clientReady, setClientReady] = useState(false);
  const [myChannels, setChannels] = useState();
  const [matchesFetched, setMatchesFetched] = useState(false);

  let connectingUser = false;

  function generateShortChannelId(userId1: string, userId2: string): string {
    // Sort the user IDs to ensure consistency
    const sortedIds = [userId1, userId2].sort();

    // Combine the first 8 characters of each ID
    const combined = sortedIds[0].slice(0, 8) + sortedIds[1].slice(0, 8);

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    // Convert hash to a string and take the first 16 characters
    return Math.abs(hash).toString(36).slice(0, 16);
  }

  // Function to connect user
  const setupClient = useCallback(async () => {
    if (!session?.user?.id || clientReady) return;

    try {
      // TODO: Add logic to check if user is already connected (at the end of the onboarding the user gets created in stream chat
      console.log("Connecting user...");
      await connectUser({ id: session.user.id });
      console.log("User connected successfully");
      setClientReady(true);
    } catch (error) {
      console.error("Failed to connect user", error);
    }
  }, [session?.user?.id, clientReady]);

  // Function to fetch matches
  const fetchMatches = useCallback(async () => {
    if (!clientReady || matchesFetched) return;

    try {
      console.log("Fetching matches...");

      try {
        const { data: matches, error } = await supabase
          .from("matches")
          .select(
            "*, user1:profiles_test!user1_id(*), user2:profiles_test!user2_id(*)"
          )
          .or(`user1_id.eq.${session.user.id},user2_id.eq.${session.user.id}`)
          .eq("matched", true);

        if (error) throw error;

        // Ensure all users exist in Stream Chat
        const allUsers = matches.flatMap((match) => [match.user1, match.user2]);
        await ensureUsersExist(client, allUsers);

        const channelPromises = matches.map(async (match) => {
          const otherUser =
            match.user1_id === session.user.id ? match.user2 : match.user1;
          const channelId = generateShortChannelId(
            session.user.id,
            otherUser.id
          );

          console.log(
            `Attempting to create/fetch channel for users: ${session.user.id} and ${otherUser.id}`
          );
          console.log(`Generated channel ID: ${channelId}`);

          let channel = client.channel("messaging", channelId, {
            members: [session.user.id, otherUser.id],
            name: otherUser.name,
          });

          try {
            await channel.create();
            console.log("Channel created successfully:", channel.id);
          } catch (error) {
            if (error.code === 4) {
              console.log("Channel already exists:", channel.id);
            } else {
              console.error("Error creating channel:", error);
            }
          }

          return channel;
        });

        const createdChannels = await Promise.all(channelPromises);
        setChannels(createdChannels);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }

      setMatchesFetched(true);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }, [clientReady, matchesFetched]);

  // Effect for connecting user
  useEffect(() => {
    if (client && !clientReady) {
      setupClient();
    }
  }, [client, clientReady, setupClient]);

  // Effect for fetching matches
  useEffect(() => {
    if (clientReady && !matchesFetched) {
      fetchMatches();
    }
  }, [clientReady, matchesFetched, fetchMatches]);

  async function ensureUsersExist(
    client: StreamChat,
    users: { id: string; name: string }[]
  ) {
    for (const user of users) {
      try {
        await client.upsertUser({ id: user.id, name: user.name });
        console.log(`User ${user.id} ensured in Stream Chat`);
      } catch (error) {
        console.error(`Error ensuring user ${user.id} exists:`, error);
      }
    }
  }

  if (!session?.user) {
    return null;
  }

  if (!clientReady || !matchesFetched) {
    return <ActivityIndicator size="large" color={Colors.light.accent} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [session.user.id] },
        }}
        sort={{ last_message_at: -1 }}
        onSelect={(channel) => {
          console.log("Selected channel:", channel.id);
          navigation.navigate("ChatChannel", {
            channelId: channel.id,
          });
        }}
      />
    </SafeAreaView>
  );
}
