import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { Redirect, Stack, router, useRouter } from 'expo-router';
import { View } from 'react-native';
import { PrimaryButton, PrimaryButtonText } from '@/components/ui/Buttons';
import { ThemedText } from '@/components/ThemedText';
import Auth from '@/components/Auth';
import Onboarding from '@/components/Onboarding';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const session = useAuth();
    const showOnboarding = useProfile(session);
    const [loaded, error] = useFonts({
        SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
        HeadingBold: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
        HeadingRegular: require('@/assets/fonts/RobotoSlab-Regular.ttf'),
        HeadingMedium: require('@/assets/fonts/RobotoSlab-Medium.ttf'),
        HeadingLight: require('@/assets/fonts/RobotoSlab-Light.ttf'),
        BodyBold: require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
        BodySemiBold: require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        BodyRegular: require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
        BodyMedium: require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
        BodyLight: require('@/assets/fonts/PlusJakartaSans-Light.ttf'),
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
        <RootNav session={session} showOnboarding={showOnboarding} />
    );
}


function RootNav(props: any) {
    if (props.session && props.showOnboarding === true) {
        return <Onboarding session={props.session} />
    } else if (props.session && props.showOnboarding === false) {
        return (
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        )
    } else {
        return <Auth onboarding={props.showOnboarding} />
    }
}