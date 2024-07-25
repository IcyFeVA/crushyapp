import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Channel, MessageList, MessageInput, useChatContext } from 'stream-chat-expo';
import { useRoute } from '@react-navigation/native';

export default function ChatChannelScreen() {
  const route = useRoute();
  const { channelId } = route.params;
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const loadChannel = async () => {
      if (channelId) {
        const channelInstance = client.channel('messaging', channelId);
        await channelInstance.watch();
        setChannel(channelInstance);
      }
    };

    loadChannel();
  }, [channelId, client]);

  if (!channel) {
    return null; // or a loading indicator
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Channel channel={channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </SafeAreaView>
  );
}