import React, { useCallback, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChannelList, useChatContext } from 'stream-chat-expo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useAuth } from '@/hooks/useAuth';

export default function ChannelListScreen() {
  const navigation = useNavigation();
  const { client } = useChatContext();
  const session = useAuth();
  const [clientReady, setClientReady] = useState(false);
  const [myChannel, setChannel] = useState();

  useEffect(() => {
    const setupClient = async () => {
      try {
        if (!session?.user?.id) return;

        console.log('connectUser')
        await client.connectUser(
          {
              id: "Crushy",
              name: 'Crushy',
              image: 'https://getstream.io/random_svg/?name=John',
          },
          client.devToken('Crushy'),
        );

        try {
          const channel = client.channel('messaging', 'mikroleap', {
            members: ["Crushy", 'mikroleap'],
          });
          await channel.watch();

          setChannel(channel);
          console.log('Channel set up successfully');
        } catch (error) {
          console.error('Error setting up channel:', error);
        }

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

  }, [session, client]);








  // const disconnectUser = useCallback(async () => {
  //   try {
  //     if (client && client.userID) {
  //       await client.disconnectUser();
  //       console.log('User disconnected successfully');
  //     }
  //   } catch (error) {
  //     console.error('Error disconnecting user:', error);
  //   }
  // }, [client]);


  // useFocusEffect(
  //   useCallback(() => {
  //     // This effect runs when the screen comes into focus
  //     console.log('focusing')

  //     // Cleanup function that runs when the screen goes out of focus
  //     return () => {
  //       console.log('disconnecting user')
  //       disconnectUser();
  //     };
  //   }, [disconnectUser])
  // );

  // // Handle hardware back button (Android)
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('beforeRemove', (e) => {
  //     console.log('disconnecting user')
  //     disconnectUser();
  //   });

  //   return unsubscribe;
  // }, [navigation, disconnectUser]);












  if (!clientReady) return <Text>Loading...</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ChannelList
        filters={{ members: { $in: ['Crushy'] } }}
        sort={{}}
        onSelect={(channel) => {
          console.log(channel)
          navigation.navigate('ChatChannel', { channelId: channel.id });
        }}
      />
    </SafeAreaView>
  );
}