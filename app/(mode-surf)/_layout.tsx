// app/profile/_layout.js
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import SearchFilters from './searchFilters';
import Surf from './surf';
import FilterAgeRange from '../searchFilters/filterAgeRange';
import FilterGenderPreference from '../searchFilters/filterGenderPreference';
import FilterStarsign from '../searchFilters/filterStarsign';
import DetailsScreen from './profile';


const Stack = createStackNavigator();

export default function SurfLayout() {
    return (
        <Stack.Navigator initialRouteName='surf' >
            <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.ScaleFromCenterAndroid }}>
                <Stack.Screen
                    name="searchFilters"
                    component={SearchFilters}
                />
                <Stack.Screen
                    name="surf"
                    component={Surf}
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
