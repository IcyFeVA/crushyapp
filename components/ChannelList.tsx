import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { connectUser, chatClient } from "@/lib/streamChat";
import { useChatContext, ChannelList } from "stream-chat-expo";
import { ActivityIndicator } from "react-native";

export default function Inbox() {
  const navigation = useNavigation();
  const session = useAuth();
  const { client } = useChatContext();
  const isConnectedRef = useRef(false);
  const isInChatChannelRef = useRef(false);
  const isMountedRef = useRef(true);
  const [channelsLoaded, setChannelsLoaded] = useState(false);

  function generateShortChannelId(userId1: string, userId2: string): string {
    const sortedIds = [userId1, userId2].sort();
    const combined = sortedIds[0].slice(0, 8) + sortedIds[1].slice(0, 8);
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36).slice(0, 16);
  }

  const setupClient = useCallback(async () => {
    if (!session?.user?.id || isConnectedRef.current) return;

    try {
      console.log("Connecting user...");
      await connectUser({
        id: session.user.id,
        name: session.user.email || "Anonymous User",
      });
      if (isMountedRef.current) {
        isConnectedRef.current = true;
        console.log("User connected successfully");
      }
    } catch (error) {
      console.error("Failed to connect user", error);
    }
  }, [session?.user?.id, session?.user?.email]);

  const disconnectUser = useCallback(async () => {
    if (isConnectedRef.current) {
      try {
        await chatClient.disconnectUser();
        if (isMountedRef.current) {
          isConnectedRef.current = false;
          setChannelsLoaded(false);
          console.log("User disconnected successfully");
        }
      } catch (error) {
        console.error("Error disconnecting user:", error);
      }
    }
  }, []);

  const fetchAndCreateChannels = useCallback(async () => {
    if (!isConnectedRef.current) return;

    try {
      console.log("Fetching matches...");
      const { data: matches, error } = await supabase
        .from("matches")
        .select(
          "*, user1:profiles_test!user1_id(*), user2:profiles_test!user2_id(*)"
        )
        .or(`user1_id.eq.${session.user.id},user2_id.eq.${session.user.id}`)
        .eq("matched", true);

      if (error) throw error;

      console.log("Matches fetched:", matches.length);

      if (matches.length === 0) {
        console.log("No matches found");
        setChannelsLoaded(true);
        return;
      }

      const channelPromises = matches.map(async (match) => {
        const otherUser =
          match.user1_id === session.user.id ? match.user2 : match.user1;
        const channelId = generateShortChannelId(session.user.id, otherUser.id);

        try {
          let channel = client.channel("messaging", channelId, {
            members: [session.user.id, otherUser.id],
            name: otherUser.name || "Anonymous User",
          });
          await channel.create();
          console.log("Channel created/fetched:", channelId);
          return channel;
        } catch (error) {
          console.error("Error creating/fetching channel:", error);
          return null;
        }
      });

      const createdChannels = (await Promise.all(channelPromises)).filter(Boolean);
      console.log("Channels created/fetched:", createdChannels.length);
      setChannelsLoaded(true);
    } catch (error) {
      console.error("Error fetching and creating channels:", error);
      setChannelsLoaded(true);
    }
  }, [session?.user?.id, client]);

  useFocusEffect(
    useCallback(() => {
      setupClient().then(() => {
        if (isConnectedRef.current) {
          fetchAndCreateChannels();
        }
      });
    }, [setupClient, fetchAndCreateChannels])
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      const currentRoute = e.data.state.routes[e.data.state.index];
      if (currentRoute.name !== 'ChannelList' && currentRoute.name !== 'ChatChannel') {
        disconnectUser();
      }
    });

    return () => {
      unsubscribe();
      isMountedRef.current = false;
    };
  }, [navigation, disconnectUser]);

  if (!session?.user) {
    return null;
  }

  if (!isConnectedRef.current || !channelsLoaded) {
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