import { Stack } from 'expo-router';
import { TransitionPresets } from '@react-navigation/stack';
import { Platform } from 'react-native';

export default function ProfileLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="filterGenderPreference" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
            <Stack.Screen name="filterStarsign" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
            <Stack.Screen
                name="filterAgeRange"
                options={{
                    headerShown: false,
                    presentation: Platform.OS === 'ios' ? 'formSheet' : 'modal',
                    ...Platform.select({
                        ios: {
                            gestureEnabled: false,
                            cardOverlayEnabled: true,
                            cardStyle: { backgroundColor: 'transparent' },
                        },
                    }),
                }}
            />
        </Stack>
    );
}