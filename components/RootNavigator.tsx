// RootNavigator.tsx
import { Stack, useRouter } from 'expo-router';
import Auth from '@/components/Auth';

export default function RootNavigator({ session, showOnboarding, setShowOnboarding }: any) {
    if (session) {
        return (
            <Stack initialRouteName={showOnboarding ? 'onboarding' : '(tabs)'} screenOptions={{ headerShown: false }} >
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        );
    } else {
        return <Auth />;
    }
}
