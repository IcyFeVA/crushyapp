import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { connectUser } from "@/lib/streamChat";
import { useChatContext } from "stream-chat-expo";
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

  useEffect(() => {
    if (session?.user) {
      fetchMatches();

      const setupClient = async () => {
        try {
          if (!session?.user?.id) return;

          console.log("Connecting user...");
          await connectUser({ id: session?.user.id });

          setClientReady(true);
        } catch (error) {
          console.error("Failed to connect user", error);
        }
      };

      if (client && !clientReady) setupClient();
    }
  }, [session]);

  const fetchMatches = async () => {
    const { data, error } = await supabase
      .from("matches")
      .select("profiles_test!matches_user2_id_fkey(id, name, avatar_url)")
      .eq("user1_id", session?.user.id)
      .eq("matched", true);

    if (error) {
      console.error("Error fetching matches:", error);
    } else {
      setMatches(data.map((match: any) => match.profiles_test));
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

  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <View style={defaultStyles.innerContainer}>
        <Text style={defaultStyles.h2}>Inbox</Text>
        <FlatList
          data={matches}
          renderItem={renderMatch}
          keyExtractor={(item) => item.id}
        />
      </View>
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


