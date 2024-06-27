import 'react-native-gesture-handler';
// check if crashes in production https://reactnavigation.org/docs/stack-navigator/

import { Slot, SplashScreen } from 'expo-router';
import RootNavigator from '@/components/RootNavigator';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv'
import hobbiesInterests from '@/constants/Interests'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { clearAllStorage, getData, resetUserSearchFilters } from '@/utils/storage';
// export const storage = new MMKV()

// const interests = hobbiesInterests

// const hasInterests = storage.contains('app.interests')
// if (!hasInterests) {
//     console.log('storing interests')
//     storage.set('app.interests', JSON.stringify(interests))
// }






if (Platform.OS != 'ios') {
    NavigationBar.setBackgroundColorAsync('white');
}




export default function RootLayout() {
    const session = useAuth();
    const [showOnboarding, setShowOnboarding] = useState(useProfile(session));

    const [loaded, error] = useFonts({
        HeadingBold: require('@/assets/fonts/RobotoSlab-Bold.ttf'),
        HeadingRegular: require('@/assets/fonts/RobotoSlab-Regular.ttf'),
        HeadingMedium: require('@/assets/fonts/RobotoSlab-Medium.ttf'),
        HeadingLight: require('@/assets/fonts/RobotoSlab-Light.ttf'),
        BodyBold: require('@/assets/fonts/PlusJakartaSans-Bold.ttf'),
        BodySemiBold: require('@/assets/fonts/PlusJakartaSans-SemiBold.ttf'),
        BodyRegular: require('@/assets/fonts/PlusJakartaSans-Regular.ttf'),
        BodyMedium: require('@/assets/fonts/PlusJakartaSans-Medium.ttf'),
        BodyLight: require('@/assets/fonts/PlusJakartaSans-Light.ttf'),
        CopperBook: require('@/assets/fonts/Copernicus-Book.ttf'),
        CopperBold: require('@/assets/fonts/Copernicus-Bold.ttf'),
        CopperExtraBold: require('@/assets/fonts/Copernicus-Extrabold.ttf'),
    });

    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();

            //clearAllStorage()

            getData('genderPreference').then(genderPreference => {
                if (genderPreference === undefined) {
                    console.log('no search preferences found, resetting')
                    resetUserSearchFilters()
                } else {
                    console.log('search preferences found', genderPreference)
                }
            })
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider>
                <RootNavigator
                    session={session}
                    showOnboarding={showOnboarding}
                    setShowOnboarding={setShowOnboarding}
                />
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}
