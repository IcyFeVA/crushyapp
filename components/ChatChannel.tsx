// import React, { useEffect, useState } from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Channel, MessageList, MessageInput, useChatContext } from 'stream-chat-expo';
// import { useRoute } from '@react-navigation/native';

// export default function ChatChannelScreen() {
//   const route = useRoute();
//   const { channelId } = route.params;
//   const { client } = useChatContext();
//   const [channel, setChannel] = useState(null);

//   useEffect(() => {
//     const loadChannel = async () => {
//       if (channelId) {
//         const channelInstance = client.channel('messaging', channelId);
//         await channelInstance.watch();
//         setChannel(channelInstance);
//       }
//     };

//     loadChannel();
//   }, [channelId, client]);

//   if (!channel) {
//     return null; // or a loading indicator
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Channel channel={channel}>
//         <MessageList />
//         <MessageInput />
//       </Channel>
//     </SafeAreaView>
//   );
// }

import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { StreamChat } from "stream-chat";
import { useRoute } from "@react-navigation/native";
import { createChannel } from "@/lib/streamChat";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
  useChatContext,
} from "stream-chat-expo";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";

export default function App() {
  const [ready, setReady] = useState();
  const { client } = useChatContext();
  const route = useRoute();
  const { channelId, myId, matchId } = route.params;

  console.log(channelId);
  const channel = createChannel(channelId, [myId, matchId]);

  const ChannelScreen = () => {
    const { bottom } = useSafeAreaInsets();

    return (
      <ChatOverlayProvider bottomInset={bottom} topInset={0}>
        <SafeAreaView>
          <Chat client={client}>
            {/* Setting keyboardVerticalOffset as 0, since we don't have any header yet */}
            <Channel channel={channel} keyboardVerticalOffset={0}>
              <View style={{ flex: 1 }}>
                <MessageList />
                <MessageInput />
              </View>
            </Channel>
          </Chat>
        </SafeAreaView>
      </ChatOverlayProvider>
    );
  };

  useEffect(() => {
    const initChat = async () => {
      //await connectUserPromise;
      setReady(true);
    };

    initChat();
  }, []);

  if (!ready) {
    return <ActivityIndicator size="large" color={Colors.light.accent} />;
  }

  return (
    <SafeAreaProvider>
      <ChannelScreen channel={channel} />
    </SafeAreaProvider>
  );
}
