// app/profile/_layout.js
import { Stack } from 'expo-router';
import { TransitionPresets } from '@react-navigation/stack';


export default function SurfLayout() {
    return (
        <Stack screenOptions={{ headerShown: false, ...TransitionPresets.RevealFromBottomAndroid }}>
            <Stack.Screen name="filterGenderPreference" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
            <Stack.Screen name="filterAgeRange" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
        </Stack>
    );
}
