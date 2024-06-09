import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import Auth from '@/components/Auth';
import Onboarding from '@/components/Onboarding';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Stack, useRouter } from 'expo-router';
import { View } from 'react-native';
import { PrimaryButton, PrimaryButtonText } from '@/components/buttons/Buttons';
import { ThemedText } from '@/components/ThemedText';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const session = useAuth();
    const showOnboarding = useProfile(session);
    const [loaded, error] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    });

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
                <SafeAreaView style={{ flex: 1 }}>
                    {
                        session ? (
                            showOnboarding === false ? (
                                <Stack>
                                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                                    <Stack.Screen name="(modals)/surf" options={{ presentation: 'modal' }} />
                                    <Stack.Screen name="+not-found" />
                                </Stack>
                            ) : (
                                <Onboarding session={session} />
                            )
                        ) : (
                            <Auth />
                        )
                    }
                </SafeAreaView>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
