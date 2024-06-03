import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, Link } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();



export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

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
        <RootLayoutNav />
      </ThemeProvider >
    </SafeAreaProvider>
  );

}


function RootLayoutNav() {

  return (
    <Stack>
      {/* <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Log in or sign up',
          headerTitleStyle: {
            fontFamily: 'SpaceMono',
          },
          headerLeft: () => (
            <Link href="../" asChild>
              <Ionicons name="close-outline" size={28} />
            </Link>
          ),
        }}
      /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/surf"
        options={{
          presentation: 'modal',
        }}
      />
      <Stack.Screen name="+not-found" />
    </Stack >
  )
}