// app/profile/_layout.js
import { Stack } from 'expo-router';

export default function SurfLayout() {
    return (
        <Stack initialRouteName='surf' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="filters" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="surf" options={{ headerShown: false }} />
        </Stack>
    );
}
