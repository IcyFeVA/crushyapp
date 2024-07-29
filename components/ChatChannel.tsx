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

      // Get member names
      const members = Object.values(newChannel.state.members);
      const memberNames = members.map(
        (member) => member.user?.name || "Unknown User"
      );
      console.log("Channel members:", memberNames);

      // If you want to get the other user's name (assuming it's a 1-on-1 chat)
      const otherMember = members.find(
        (member) => member.user?.id !== client.userID
      );
      const otherUserName = otherMember?.user?.name || "Unknown User";
      console.log("Other user name:", otherUserName);

      // Set the channel name to the other user's name
      if (otherUserName && otherUserName !== "Unknown User") {
        navigation.setOptions({
          headerTitle: otherUserName,
        });
      }
    };

    createAndWatchChannel();
  }, [channelId, client, navigation]);

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
