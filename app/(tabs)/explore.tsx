import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Explore() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Text>Explore Screen</Text>
      </View>
    </SafeAreaView>
  );
}