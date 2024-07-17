// app/profile/_layout.js
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import SearchFilters from '@/app/searchFilters';
import Dive from './dive';
import FilterAgeRange from '@/app/searchFilters/filterAgeRange';
import FilterGenderPreference from '@/app/searchFilters/filterGenderPreference';
import FilterStarsign from '@/app/searchFilters/filterStarsign';
import DetailsScreen from '@/app/profile';


const Stack = createStackNavigator();

export default function SurfLayout() {
    return (
        <Stack.Navigator initialRouteName='dive' >
            <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}>
                <Stack.Screen
                    name="searchFilters"
                    component={SearchFilters}
                />
                <Stack.Screen
                    name="Dive"
                    component={Dive}
                />
            </Stack.Group>

            <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.SlideFromRightIOS }}>
                <Stack.Screen
                    name="filterGenderPreference"
                    component={FilterGenderPreference}
                />
                <Stack.Screen
                    name="filterStarsign"
                    component={FilterStarsign}
                />
                <Stack.Screen
                    name="filterAgeRange"
                    component={FilterAgeRange}
                />
            </Stack.Group>

            <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.BottomSheetAndroid }}>
                <Stack.Screen
                    name="Profile"
                    component={DetailsScreen}
                    initialParams={{ id: null, imageUrl: null }}
                />
            </Stack.Group>
        </Stack.Navigator>
    );
}
