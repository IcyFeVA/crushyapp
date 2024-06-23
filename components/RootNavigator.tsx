// RootNavigator.tsx
import { Stack, useRouter } from 'expo-router';
import Auth from '@/components/Auth';
import { getData, storeData } from '@/utils/storage';

export default function RootNavigator({ session, showOnboarding, setShowOnboarding }: any) {
    if (session) {
        storeData('user', session);

        getData('user').then(user => {
            console.log(user);
        });

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
