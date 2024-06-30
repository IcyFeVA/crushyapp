// app/profile/_layout.js
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import SearchFilters from './searchFilters';
import Surf from './surf';
import FilterAgeRange from '../matching-prefs/filterAgeRange';
import FilterGenderPreference from '../matching-prefs/filterGenderPreference';
import FilterStarsign from '../matching-prefs/filterStarsign';
const Stack = createStackNavigator();

export default function SurfLayout() {
    return (
        <Stack.Navigator initialRouteName='surf' screenOptions={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}>
            {/* <Stack.Screen name="filters" options={{ headerShown: false, presentation: 'modal', animation: 'slide_from_bottom', gestureDirection: 'vertical' }} /> */}
            <Stack.Screen
                name="searchFilters"
                component={SearchFilters}
            />
            <Stack.Screen
                name="surf"
                component={Surf}
            />
            <Stack.Screen
                name="filterGenderPreference"
                component={FilterGenderPreference}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                }}
            />
            <Stack.Screen
                name="filterStarsign"
                component={FilterStarsign}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                }}
            />
            <Stack.Screen
                name="filterAgeRange"
                component={FilterAgeRange}
                options={{
                    headerShown: false,
                    ...TransitionPresets.SlideFromRightIOS
                }}
            />
        </Stack.Navigator>
    );
}
