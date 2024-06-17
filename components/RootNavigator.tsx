// RootNavigator.tsx
import { Stack, useRouter } from 'expo-router';
import Auth from '@/components/Auth';

export default function RootNavigator({ session, showOnboarding, setShowOnboarding }: any) {
    if (session) {
        return (
            <Stack initialRouteName={showOnboarding ? 'onboarding' : '(tabs)'} >
                <Stack.Screen name="onboarding" options={{ headerShown: false }} />
                <Stack.Screen name="mode-surf" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        );
    } else {
        return <Auth />;
    }
}
