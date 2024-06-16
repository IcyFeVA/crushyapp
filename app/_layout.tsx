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
import { View, Text } from 'react-native-ui-lib';
import { PrimaryButton, PrimaryButtonText } from '@/components/ui/Buttons';
import { ThemedText } from '@/components/ThemedText';
import Auth from '@/components/Auth';
import Onboarding from '@/components/Onboarding';
import Toast from 'react-native-toast-message';
import { Colors } from '@/constants/Colors';
import { create } from 'zustand';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const session = useAuth();
    let showOnboarding = useProfile(session);
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

    const setShowOnboarding = () => {
        showOnboarding = false
        console.log("showOnboarding>>>>>>", showOnboarding)
        setTimeout(() => {
            return router.replace('(tabs)');
        }, 1000)
    }

    const toastConfig = {
        default: ({ text1, text2, props }) => (
            <View style={{ display: 'flex', justifyContent: 'center', width: '94%', backgroundColor: Colors.light.accent, borderColor: Colors.light.white, borderRadius: 8, padding: 16 }}>
                <Text style={{ fontFamily: 'HeadingBold', color: Colors.light.textInverted }}>{text1}</Text>
                <Text style={{ fontFamily: 'BodyRegular', color: Colors.light.textInverted }}>{text2}</Text>
            </View>
        )
    };





    return (
        <RootNav toastconfig={toastConfig} session={session} showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />
    );
}


function RootNav(props: any) {
    if (props.session) {
        return (
            <Stack initialRouteName="(tabs)">
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        )
    } else {
        return <Auth />
    }
}