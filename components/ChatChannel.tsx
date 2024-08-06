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
  TouchableOpacity,
  ActionSheetIOS,
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
  edited?: boolean;
  pending?: boolean;
  local_id?: string;
};

const formatDate = (date: Date) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return "Today";
  } else if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return date.toLocaleDateString();
  }
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
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
  const [visibleTimestamps, setVisibleTimestamps] = useState<
    Record<string, boolean>
  >({});
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editText, setEditText] = useState("");

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

  const getMessagesWithDateLabels = useCallback((messages: Message[]) => {
    let currentDate = "";
    const messagesWithLabels = [];

    // Reverse the messages array to process them in chronological order
    const reversedMessages = [...messages].reverse();

    reversedMessages.forEach((message, index) => {
      const messageDate = new Date(message.created_at);
      const formattedDate = formatDate(messageDate);

      if (formattedDate !== currentDate) {
        currentDate = formattedDate;
        messagesWithLabels.push({
          id: `date-${index}`,
          type: "date",
          date: formattedDate,
        });
      }

      messagesWithLabels.push(message);
    });

    // Reverse the array again to maintain the inverted order for FlatList
    return messagesWithLabels.reverse();
  }, []);

  const toggleTimestamp = useCallback((messageId: string) => {
    setVisibleTimestamps((prev) => ({
      ...prev,
      [messageId]: !prev[messageId],
    }));
  }, []);

  const handleLongPress = useCallback(
    (message: Message) => {
      if (message.sender_id !== session?.user?.id) return;

      if (Platform.OS === "ios") {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ["Cancel", "Edit", "Delete"],
            destructiveButtonIndex: 2,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if (buttonIndex === 1) {
              setEditingMessage(message);
              setEditText(message.content);
            } else if (buttonIndex === 2) {
              handleDeleteMessage(message);
            }
          }
        );
      } else {
        // For Android, you might want to use a custom modal or a third-party library like react-native-action-sheet
        Alert.alert("Message Options", "What would you like to do?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Edit",
            onPress: () => {
              setEditingMessage(message);
              setEditText(message.content);
            },
          },
          {
            text: "Delete",
            onPress: () => handleDeleteMessage(message),
            style: "destructive",
          },
        ]);
      }
    },
    [session?.user?.id]
  );

  const handleEditMessage = async () => {
    if (!editingMessage || !editText.trim()) return;

    try {
      const { data, error } = await supabase
        .from("messages")
        .update({ content: editText.trim(), edited: true })
        .eq("id", editingMessage.id)
        .select();

      if (error) throw error;

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === editingMessage.id
            ? { ...msg, content: editText.trim(), edited: true }
            : msg
        )
      );

      setEditingMessage(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing message:", error);
      Alert.alert("Error", "Failed to edit message. Please try again.");
    }
  };

  const handleDeleteMessage = async (message: Message) => {
    try {
      const { error } = await supabase
        .from("messages")
        .delete()
        .eq("id", message.id);

      if (error) throw error;

      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== message.id)
      );
    } catch (error) {
      console.error("Error deleting message:", error);
      Alert.alert("Error", "Failed to delete message. Please try again.");
    }
  };

  const renderItem = useCallback(
    ({ item, index }) => {
      if (item.type === "date") {
        return (
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{item.date}</Text>
          </View>
        );
      }

      const messageTime = new Date(item.created_at);
      const isCurrentUser = item.sender_id === session?.user?.id;
      const isTimestampVisible = visibleTimestamps[item.id];

      return (
        <TouchableOpacity
          onPress={() => toggleTimestamp(item.id)}
          onLongPress={() => handleLongPress(item)}
        >
          <View
            style={[
              styles.messageContainer,
              isCurrentUser ? styles.sentMessage : styles.receivedMessage,
              item.pending && styles.pendingMessage,
            ]}
          >
            <View style={styles.messageContent}>
              <Text style={styles.messageText}>{item.content}</Text>
              {item.edited && <Text style={styles.editedText}>(edited)</Text>}
            </View>
            {isTimestampVisible && (
              <Text
                style={[
                  styles.timeText,
                  isCurrentUser ? styles.sentTimeText : styles.receivedTimeText,
                ]}
              >
                {formatTime(messageTime)}
              </Text>
            )}
            {item.pending && <Text style={styles.pendingText}>Sending...</Text>}
          </View>
        </TouchableOpacity>
      );
    },
    [session?.user?.id, visibleTimestamps, toggleTimestamp, handleLongPress]
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

  const messagesWithDateLabels = getMessagesWithDateLabels(messages);

  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={100}
      >
        <FlatList
          ref={flatListRef}
          data={getMessagesWithDateLabels(messages)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted
        />
        {editingMessage ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
            />
            <Pressable style={styles.editButton} onPress={handleEditMessage}>
              <Text style={styles.editButtonText}>Save</Text>
            </Pressable>
            <Pressable
              style={styles.editButton}
              onPress={() => setEditingMessage(null)}
            >
              <Text style={styles.editButtonText}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
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
        )}
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
  dateContainer: {
    alignItems: "center",
    marginVertical: 10,
  },
  dateText: {
    backgroundColor: Colors.light.tertiary,
    color: Colors.light.text,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  editContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.light.tertiary,
  },
  editInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.light.tertiary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  editButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: "center",
  },
  editButtonText: {
    color: Colors.light.textInverted,
    fontWeight: "bold",
  },
  messageContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-end",
  },
  editedText: {
    fontSize: 10,
    fontStyle: "italic",
    color: Colors.light.textSecondary,
    marginLeft: 5,
    alignSelf: "flex-end",
  },
});
