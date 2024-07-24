// components/ChatChannel.tsx

import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, MessageList, MessageInput } from 'stream-chat-expo';
import { useRoute } from '@react-navigation/native';

export default function ChatChannelScreen() {
  const route = useRoute();
  const { channel } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}