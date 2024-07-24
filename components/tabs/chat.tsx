// components/tabs/chat.tsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { chatClient, connectUser } from '@/lib/streamChat';
import { useNavigation, useRoute } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';
import { supabase } from '@/lib/supabase';

export default function ChatScreen() {
    const [channel, setChannel] = useState(null);
    const [clientReady, setClientReady] = useState(false);
    const [error, setError] = useState(null);
    const session = useAuth();
    const navigation = useNavigation();
    const route = useRoute();
    const { matchId, matchName } = route.params;

    useEffect(() => {
        const setupChatClient = async () => {
            if (session?.user) {
                try {
                    console.log('Invoking generate-stream-token function...');
                    const { data, error } = await supabase.functions.invoke('generate-stream-token', {
                        body: { user: { id: session.user.id } },
                    });

                    if (error) {
                        console.error('Error from generate-stream-token:', error);
                        console.error('Error details:', error.message, error.stack);
                        throw new Error(error.message || 'Failed to generate token');
                    }

                    console.log('Response from generate-stream-token:', data);

                    if (!data || !data.token) {
                        throw new Error('No token received from generate-stream-token');
                    }

                    try {
                        await connectUser({ id: session.user.id, name: session.user.email }, data.token);
                        console.log('User connected successfully');
                      } catch (error) {
                        console.error('Error connecting user to Stream:', error);
                      }


                    //   const channel = chatClient.channel('messaging', matchId, {
                    //     members: [session.user.id, matchId],
                    //   });
                    //   await channel.watch();
                    //   setChannel(channel);
                } catch (error) {
                    console.error('Error setting up chat:', error);
                    console.error('Error details:', error.message, error.stack);
                    setError(error.message);
                }
            }
        };

        if (session?.user && matchId) {
            setupChatClient();
          }

          return () => {
            if (clientReady) {
              chatClient.disconnectUser();
              setClientReady(false);
            }
          };
    }, [session, matchId]);

    if (error) {
        return (
            <SafeAreaView style={defaultStyles.SafeAreaView}>
                <View style={styles.centerContainer}>
                    <Text style={styles.errorText}>Error: {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!clientReady || !channel) {
        return (
            <SafeAreaView style={defaultStyles.SafeAreaView}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <OverlayProvider>
                <Chat client={chatClient}>
                    <Channel channel={channel}>
                        <View style={styles.chatContainer}>
                            <MessageList />
                            <MessageInput />
                        </View>
                    </Channel>
                </Chat>
            </OverlayProvider>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
});