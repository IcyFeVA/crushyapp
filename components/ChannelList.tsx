import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelList, useChatContext } from 'stream-chat-expo';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';

export default function ChannelListScreen() {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const session = useAuth();
  const [clientReady, setClientReady] = useState(false);
  const [myChannel, setMyChannel] = useState();

    useEffect(() => {
      const setupClient = async () => {
        try {
          if (!session?.user?.id) return;

          console.log('Connecting user...');
          await client.connectUser(
            {
              id: "Crushy",
              name: 'Crushy',
              image: 'https://getstream.io/random_svg/?name=John',
            },
            client.devToken('Crushy'),
          );

          setClientReady(true);
        } catch (error) {
          console.error('Failed to connect user', error);
        }
      };

      if (client) setupClient();

      // Cleanup function
      // return () => {
      //   const disconnectUser = async () => {
      //     try {
      //       if (client) {
      //         await client.disconnectUser();
      //         console.log('User disconnected successfully');
      //       }
      //     } catch (error) {
      //       console.error('Error disconnecting user:', error);
      //     }
      //   };

      //   disconnectUser();
      //   setClientReady(false);
      // };
    }, [client, session])

  if (!clientReady) {
    return <ActivityIndicator size="large" color={Colors.light.accent} />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChannelList
        filters={{ members: { $in: ['Crushy'] } }}
        sort={{}}
        onSelect={(channel) => {
          navigation.navigate('ChatChannel', { channelId: channel.id });
        }}
      />
    </SafeAreaView>
  );
}