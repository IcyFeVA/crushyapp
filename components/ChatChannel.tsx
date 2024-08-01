import React, { useEffect, useState, useLayoutEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Channel,
  MessageList,
  MessageInput,
  useChatContext,
} from "stream-chat-expo";
import { useRoute, useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { Colors } from "@/constants/Colors";
import { supabase } from "@/lib/supabase";


export default function ChatChannelScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { channelId } = route.params;
  const { client } = useChatContext();
  const [channel, setChannel] = useState();

  useEffect(() => {
    const createAndWatchChannel = async () => {
      const newChannel = client.channel("messaging", channelId);
      await newChannel.watch();
      setChannel(newChannel);

      // Get member IDs
      const memberIds = Object.keys(newChannel.state.members);
      console.log("Member IDs:", memberIds);

      // Fetch user data from Supabase
      const { data: users, error } = await supabase
        .from("profiles_test")
        .select("id, name")
        .in("id", memberIds);

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }

      console.log("Fetched user data:", users);

      // Map user names
      const memberNames = memberIds.map((id) => {
        const user = users.find((u) => u.id === id);
        return user ? user.name : "Unknown User";
      });

      console.log("Channel members:", memberNames);

      // Find the other user (assuming 1-on-1 chat)
      const otherUser = users.find((u) => u.id !== client.userID);
      const otherUserName = otherUser ? otherUser.name : "Unknown User";
      console.log("Other user name:", otherUserName);

      // Set the channel name to the other user's name
      if (otherUserName && otherUserName !== "Unknown User") {
        navigation.setOptions({
          headerTitle: otherUserName,
        });
      }
    };

    createAndWatchChannel();
  }, [channelId, client, navigation, supabase]);

  if (!channelId || !channel) {
    return <ActivityIndicator size="large" color={Colors.light.accent} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Channel
        channel={channel}
        overrideOwnCapabilities={{
          uploadFile: false,
          sendLinks: false,
        }}
      >
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}
