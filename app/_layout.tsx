import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Alert, View, useColorScheme } from 'react-native';
import { supabase } from '@/lib/supabase';
import Auth from '@/components/Auth';
import Onboarding from '@/components/Onboarding';
import Account from '@/components/Account';
import { Session } from '@supabase/supabase-js';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [session, setSession] = useState<Session | null>(null);
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  async function getProfile() {
    try {
      const { data, error, status } = await supabase
        .from('profiles')
        .select('name, avatar_url, age')
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data && data.name) {
        data.name === null ? setShowOnboarding(true) : setShowOnboarding(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    }
  }

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    } else {
      setShowOnboarding(null);
    }
  }, [session]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          {session ? (
            showOnboarding === false ? (
              <RootLayoutNav />
            ) : (
              <Onboarding />
              // <Account session={session} />
            )
          ) : (
            <Auth />
          )}
        </SafeAreaView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(modals)/surf" options={{ presentation: 'modal' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
