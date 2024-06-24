import { Stack, useRouter } from 'expo-router';
import Auth from '@/components/Auth';
import { getData, storeData } from '@/utils/storage';
import { TransitionPresets } from '@react-navigation/stack';


export default function RootNavigator({ session, showOnboarding, setShowOnboarding }: any) {
    if (session) {
        storeData('user', session);

        return (
            <Stack initialRouteName={showOnboarding ? 'onboarding' : '(tabs)'} screenOptions={{ headerShown: false, ...TransitionPresets.RevealFromBottomAndroid }} >
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        );
    } else {
        return <Auth />;
    }
}
