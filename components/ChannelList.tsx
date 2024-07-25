// components/ChannelList.tsx

import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelList, ChannelSort, Channel, Chat, MessageInput, MessageList, OverlayProvider  } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
import { chatClient } from '@/lib/streamChat';
import { useAuth } from '@/hooks/useAuth';

const sort: ChannelSort = { last_message_at: -1 };

export default function ChannelListScreen() {
  const navigation = useNavigation();
  const session = useAuth();
  const [clientReady, setClientReady] = useState(false);
  const [channel, setChannel] = useState();

  useEffect(() => {
    const createAndWatchChannel = async () => {
      const newChannel = chatClient.channel('messaging', 'channel_id');
      await newChannel.watch();
      setChannel(newChannel);
    };

    createAndWatchChannel();
  }, []);


  useEffect(() => {
    const setupClient = async () => {
      if (!session?.user) return;

      try {
        // await chatClient.connectUser(
        //   {
        //     id: session.user.id,
        //     name: session.user.email,
        //   },
        //   session.streamToken
        // );

        await chatClient.connectUser(
          {
              id: "Crushy",
              name: 'Crushy',
              image: 'https://getstream.io/random_svg/?name=John',
          },
          chatClient.devToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQ3J1c2h5In0.7M2-tacCjPbnFaIDf56-oHZ6ammF9euZx9mKs0MhL30'),
      );
        setClientReady(true);
      } catch (error) {
        console.error('Failed to connect user', error);
      }
    };

    setupClient();

    return () => {
      chatClient.disconnectUser();
      setClientReady(false);
    };
  }, [session]);

  if (!clientReady || !session?.user) return <Text>INITIALIZING</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OverlayProvider>
      <Chat client={chatClient}>
      <Channel channel={channel}>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>r
      </OverlayProvider>
    </SafeAreaView>
  );
}