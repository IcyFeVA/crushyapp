// app/profile/_layout.js
import { Stack } from 'expo-router';
import { TransitionPresets } from '@react-navigation/stack';


export default function SurfLayout() {
    return (
        <Stack initialRouteName='surf' screenOptions={{ headerShown: false, ...TransitionPresets.RevealFromBottomAndroid }}>
            {/* <Stack.Screen name="filters" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom', gestureDirection: 'vertical' }} /> */}
            <Stack.Screen name="searchFilters" options={{ headerShown: false, animation: 'slide_from_bottom' }} />
            <Stack.Screen name="surf" options={{ headerShown: false }} />
        </Stack>
    );
}
