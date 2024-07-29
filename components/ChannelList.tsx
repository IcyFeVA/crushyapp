import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { connectUser } from "@/lib/streamChat";
import {
  useChatContext,
  ChannelPreviewMessenger,
  ChannelList,
} from "stream-chat-expo";
import { fetchStreamToken } from "@/api/auth";

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

  useEffect(() => {
    if (session?.user) {
      fetchMatches();

      const setupClient = async () => {
        try {
          if (!session?.user?.id) return;

          console.log("Connecting user...");
          await connectUser({ id: session?.user.id, name: "TESTER" });

          setClientReady(true);
        } catch (error) {
          console.error("Failed to connect user", error);
        }
      };

      if (client && !clientReady) setupClient();
    }
  }, [session]);

  const fetchMatches = async () => {
    try {
      const { data: matches, error } = await supabase
        .from("matches")
        .select(
          "*, user1:profiles_test!user1_id(*), user2:profiles_test!user2_id(*)"
        )
        .or(`user1_id.eq.${session.user.id},user2_id.eq.${session.user.id}`)
        .eq("matched", true);

      if (error) throw error;

      const channelPromises = matches.map(async (match) => {
        const otherUser =
          match.user1_id === session.user.id ? match.user2 : match.user1;
        const channelId = [session.user.id, otherUser.id].sort().join("_");

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
  };

  const renderMatch = ({ item }: { item: Match }) => (
    <Pressable
      style={styles.matchItem}
      onPress={() =>
        navigation.navigate("ChatChannel", {
          channelId: session?.user.id,
          channelName: item.name,
          avatarUrl: item.avatar_url,
          myId: session?.user.id,
          matchId: item.id,
        })
      }
    >
      <Text style={styles.matchName}>{item.name}</Text>
    </Pressable>
  );

  const CustomChannelPreview = (props) => {
    const { channel } = props;
    const otherUser = Object.values(channel.state.members).find(
      (member) => member.user.id !== session.user.id
    );

    return <ChannelPreviewMessenger {...props} title={otherUser?.user?.name} />;
  };

  if (!session?.user || !clientReady) {
    return null;
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
          navigation.navigate("ChatChannel", {
            channelId: channel.id,
          });
        }}
        Preview={CustomChannelPreview}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  matchItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.tertiary,
  },
  matchName: {
    fontSize: 16,
    fontFamily: "BodySemiBold",
  },
});
