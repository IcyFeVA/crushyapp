import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import Auth from '@/components/Auth';
import { View, Text, Image, Pressable, Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native'
// import { BlurView } from 'expo-blur';
import Me from '@/components/tabs/me';
import Surf from '@/components/tabs/surf';
import Onboarding from '@/app/onboarding';
import { useProfile } from '@/hooks/useProfile';
import { useAppContext } from '@/providers/AppProvider';
import { clearAllStorage, getData, storeData } from '@/utils/storage';
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const tabIcons = {
    homeActive: require('@/assets/images/icons/tab-home-active.png'),
    homeInactive: require('@/assets/images/icons/tab-home.png'),
    historyActive: require('@/assets/images/icons/tab-history-active.png'),
    historyInactive: require('@/assets/images/icons/tab-history.png'),
    inboxActive: require('@/assets/images/icons/tab-inbox-active.png'),
    inboxInactive: require('@/assets/images/icons/tab-inbox.png'),
    meActive: require('@/assets/images/icons/tab-me-active.png'),
    meInactive: require('@/assets/images/icons/tab-me.png'),
    exploreInactive: require('@/assets/images/icons/tab-explore.png'),
};


function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function TabNavigator() {
    const navigation = useNavigation();


    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconSource;

                    if (route.name === 'Home') {
                        iconSource = focused ? tabIcons.homeActive : tabIcons.homeInactive;
                    } else if (route.name === 'History') {
                        iconSource = focused ? tabIcons.historyActive : tabIcons.historyInactive;
                    } else if (route.name === 'Inbox') {
                        iconSource = focused ? tabIcons.inboxActive : tabIcons.inboxInactive;
                    } else if (route.name === 'Me') {
                        iconSource = focused ? tabIcons.meActive : tabIcons.meInactive;
                    } else if (route.name === 'Explore') {
                        return (
                            <Pressable style={{ marginTop: Platform.OS === 'ios' ? 0 : -4 }} onPress={() => { navigation.navigate('Explore') }}>
                                <Image source={require('@/assets/images/icons/tab-explore.png')} />
                            </Pressable>
                        )
                    }

                    return <Image source={iconSource} />
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { height: Platform.OS === 'ios' ? 80 : 48 },
                // tabBarBackground: () => (
                //     <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
                //   ),
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={SettingsScreen} />
            <Tab.Screen name="Explore" component={Surf} />
            <Tab.Screen name="Inbox" component={SettingsScreen} options={{ tabBarBadge: 6 }} />
            <Tab.Screen name="Me" component={Me} />
        </Tab.Navigator>
    );
}

export default function RootNavigator({ session }) {
    const { showOnboarding, setShowOnboarding } = useAppContext();

    useEffect(() => {
        // clearAllStorage()
        // return;

        const checkIfOnboardingDone = async () => {
            try {
                const onboardingComplete = await getData('onboardingComplete');

                if (onboardingComplete === undefined) {
                    console.log('onboarding status undefined in storage');

                    const getProfile = async () => {
                        try {
                            const { data } = await supabase
                                .from('profiles_test')
                                .select('name')
                                .eq('id', session?.user.id)
                                .single();

                            if (data) {
                                if (data?.name != null) {
                                    console.log('onboarding done, saving it in storage');
                                    await storeData('onboardingComplete', true);
                                } else {
                                    console.log('onboarding not done');
                                    setShowOnboarding(true);
                                }
                            }

                        } catch (error: any) {
                            console.log('Error getting profile:', error);
                        }
                    };

                    getProfile();


                } else {
                    console.log('onboarding status found in storage', onboardingComplete);
                }
            } catch (error) {
                console.error('Error checking onboarding status:', error);
            }
        };

        if (session) {
            checkIfOnboardingDone();
        }
    }, [session?.user.id]);

    return (
        <Stack.Navigator initialRouteName='Main'>
            {session ? (
                showOnboarding === true ? <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} /> : <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
            ) : (
                <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
            )}
        </Stack.Navigator>
    );
}






/*
            <Stack.Navigator initialRouteName={showOnboarding ? 'onboarding' : '(tabs)'} >

                <Stack.Group screenOptions={{ headerShown: false, ...TransitionPresets.RevealFromBottomAndroid }} >
                    <Stack.Screen
                        name="onboarding"
                        component={Onboarding}
                    />
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={Home} />
                        <Tab.Screen name="Settings" component={Me} />
                    </Tab.Navigator>
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
*/