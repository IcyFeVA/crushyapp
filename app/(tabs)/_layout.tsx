import React from 'react';
import { Tabs, Link } from 'expo-router';
import { Image, Pressable } from 'react-native';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 64 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('@/assets/images/icons/tab-home-active.png')} /> : <Image source={require('@/assets/images/icons/tab-home.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('@/assets/images/icons/tab-history-active.png')} /> : <Image source={require('@/assets/images/icons/tab-history.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <Link href="/modal" asChild>
              <Pressable style={{ marginTop: 8 }}>
                <Image source={require('@/assets/images/icons/tab-explore.png')} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: 'Inbox',
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('@/assets/images/icons/tab-inbox-active.png')} /> : <Image source={require('@/assets/images/icons/tab-inbox.png')} />
          ),
        }}
      />
      <Tabs.Screen
        name="me"
        options={{
          title: 'My Crushy',
          tabBarIcon: ({ color, focused }) => (
            focused ? <Image source={require('@/assets/images/icons/tab-me-active.png')} /> : <Image source={require('@/assets/images/icons/tab-me.png')} />
          ),
        }}
      />
    </Tabs>
  );
}
