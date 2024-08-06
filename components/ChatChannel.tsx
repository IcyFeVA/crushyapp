import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";
import { Colors } from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

type Message = {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  pending?: boolean;
  local_id?: string;
};

export default function ChatChannel() {
  const route = useRoute();
  const navigation = useNavigation();
  const { conversationId, otherUserId, otherUserName } = route.params;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const session = useAuth();
  const flatListRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({ headerTitle: otherUserName });
    fetchMessages();

    const subscription = supabase
      .channel("messages")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        handleNewMessage
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleNewMessage = useCallback((payload: { new: Message }) => {
    const newMessage = payload.new;
    setMessages((prevMessages) => {
      const messageIndex = prevMessages.findIndex(
        (msg) =>
          msg.local_id === newMessage.id ||
          (msg.content === newMessage.content && msg.pending)
      );

      if (messageIndex !== -1) {
        // Update existing message
        const updatedMessages = [...prevMessages];
        updatedMessages[messageIndex] = {
          ...newMessage,
          pending: false,
          local_id: undefined,
        };
        return updatedMessages;
      } else {
        // Add new message
        return [newMessage, ...prevMessages];
      }
    });
  }, []);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", conversationId)
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      Alert.alert("Error", "Failed to load messages. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async () => {
    if (inputMessage.trim() === "" || !session?.user?.id) return;

    const localId = Date.now().toString();
    const newMessage: Message = {
      id: localId,
      sender_id: session.user.id,
      content: inputMessage.trim(),
      created_at: new Date().toISOString(),
      pending: true,
      local_id: localId,
    };

    setMessages((prevMessages) => [newMessage, ...prevMessages]);
    setInputMessage("");

    try {
      const { data, error } = await supabase
        .from("messages")
        .insert({
          conversation_id: conversationId,
          sender_id: session.user.id,
          content: newMessage.content,
        })
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        const sentMessage = data[0];
        handleNewMessage({ new: sentMessage });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send message. Please try again.");

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.local_id !== localId)
      );
    }
  };

  const renderMessage = useCallback(
    ({ item }: { item: Message }) => (
      <View
        style={[
          styles.messageContainer,
          item.sender_id === session?.user?.id
            ? styles.sentMessage
            : styles.receivedMessage,
          item.pending && styles.pendingMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.content}</Text>
        {item.pending && <Text style={styles.pendingText}>Sending...</Text>}
      </View>
    ),
    [session?.user?.id]
  );

  if (isLoading) {
    return (
      <View style={[defaultStyles.SafeAreaView, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  if (!session?.user) {
    return (
      <View style={[defaultStyles.SafeAreaView, styles.loadingContainer]}>
        <Text>Please log in to view this chat.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          inverted
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type a message..."
          />
          <Pressable style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: "70%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    borderColor: Colors.light.tertiary,
    borderWidth: 1,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.tertiary,
  },
  messageText: {
    color: Colors.light.text,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.light.tertiary,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.tertiary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  sendButtonText: {
    color: Colors.light.textInverted,
    fontWeight: "bold",
  },
  pendingMessage: {
    opacity: 0.7,
  },
  pendingText: {
    fontSize: 10,
    color: Colors.light.textSecondary,
    alignSelf: "flex-end",
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
