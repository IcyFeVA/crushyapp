// components/ChannelList.tsx

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelList, ChannelSort } from 'stream-chat-expo';
import { useNavigation } from '@react-navigation/native';
import { chatClient } from '@/lib/streamChat';
import { useAuth } from '@/hooks/useAuth';

const sort: ChannelSort = { last_message_at: -1 };

export default function ChannelListScreen() {
  const navigation = useNavigation();
  const session = useAuth();
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    const setupClient = async () => {
      if (!session?.user) return;

      try {
        await chatClient.connectUser(
          {
            id: session.user.id,
            name: session.user.email,
          },
          session.streamToken // Assuming you've added this to the session object
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

  if (!clientReady || !session?.user) return null;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChannelList
        filters={{ members: { $in: [session.user.id] } }}
        sort={sort}
        onSelect={(channel) => {
          navigation.navigate('ChatChannel', { channel });
        }}
      />
    </SafeAreaView>
  );
}