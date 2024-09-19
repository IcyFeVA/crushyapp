import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Auth from "@/components/pages/Auth";
import { View, Text, Image, Pressable, Platform } from "react-native";
import {
  NavigationContainer,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import Home from "@/components/tabs/home";
import History from "@/components/tabs/history";
import Me from "@/components/tabs/me";
import Surf from "@/components/tabs/surf";
import Dive from "@/components/tabs/dive";
import Profile from "@/app/profile";
import Onboarding from "@/components/pages/Onboarding";
import SearchFilters from "@/app/searchFilters";
import FilterGenderPreference from "@/app/searchFilters/filterGenderPreference";
import FilterStarsign from "@/app/searchFilters/filterStarsign";
import FilterAgeRange from "@/app/searchFilters/filterAgeRange";
import FilterBodyType from "@/app/searchFilters/filterBodyType";
import FilterExerciseFrequency from "@/app/searchFilters/filterExerciseFrequency";
import FilterSmokingFrequency from "@/app/searchFilters/filterSmoking";
import FilterDrinkingFrequency from "@/app/searchFilters/filterDrinking";
import FilterCannabisFrequency from "@/app/searchFilters/filterCannabis";
import FilterDietPreference from "@/app/searchFilters/filterDietPreference";
import MyProfile from "@/components/pages/MyProfile";
import { useAppContext } from "@/providers/AppProvider";
import { clearAllStorage, getData, storeData } from "@/utils/storage";
import { useCallback, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ChannelList from "@/components/pages/inbox/Inbox";
import ChatChannel from "@/components/pages/inbox/ChatChannel";
import { useChatContext } from "stream-chat-expo";
import { useNotifications } from "@/contexts/NotificationContext";
import EditNameAge from "./pages/editprofile/EditNameAge";
import EditBio from "./pages/editprofile/EditBio";
import EditGender from "./pages/editprofile/EditGender";
import EditInterests from "./pages/editprofile/EditInterests";
import EditLookingFor from "./pages/editprofile/EditLookingFor";
import EditPronouns from "./pages/editprofile/EditPronouns";

const tabIcons = {
  homeActive: require("@/assets/images/icons/tab-home-active.png"),
  homeInactive: require("@/assets/images/icons/tab-home.png"),
  historyActive: require("@/assets/images/icons/tab-history-active.png"),
  historyInactive: require("@/assets/images/icons/tab-history.png"),
  inboxActive: require("@/assets/images/icons/tab-inbox-active.png"),
  inboxInactive: require("@/assets/images/icons/tab-inbox.png"),
  meActive: require("@/assets/images/icons/tab-me-active.png"),
  meInactive: require("@/assets/images/icons/tab-me.png"),
  exploreInactive: require("@/assets/images/icons/tab-explore.png"),
};

function DummySurf() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Explore</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  const navigation = useNavigation();
  const { totalNotifications } = useNotifications();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconSource;

          if (route.name === "Home") {
            iconSource = focused ? tabIcons.homeActive : tabIcons.homeInactive;
          } else if (route.name === "History") {
            iconSource = focused
              ? tabIcons.historyActive
              : tabIcons.historyInactive;
          } else if (route.name === "Inbox") {
            iconSource = focused
              ? tabIcons.inboxActive
              : tabIcons.inboxInactive;
          } else if (route.name === "Me") {
            iconSource = focused ? tabIcons.meActive : tabIcons.meInactive;
          } else if (route.name === "Explore") {
            iconSource = focused ? tabIcons.meActive : tabIcons.meInactive;
            return (
              <Image
                style={{ marginTop: Platform.OS === "ios" ? 0 : -4 }}
                source={require("@/assets/images/icons/tab-explore.png")}
                pointerEvents="none"
              />
            );
          }

          return <Image source={iconSource} />;
        },
        tabBarButton: (props) => (
          <Pressable
            {...props}
            onPress={() => {
              props.onPress();

              const getLookingFor = async () => {
                const lookingFor: number | null = await getData("lookingFor");

                if (route.name === "Explore") {
                  setTimeout(() => {
                    navigation.navigate("Home");
                    if (lookingFor == 3) {
                      // 3 is hookup
                      navigation.navigate("Surf");
                    } else {
                      navigation.navigate("Dive");
                    }
                  }, 100);
                }
              };
              getLookingFor();
            }}
          />
        ),
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { height: Platform.OS === "ios" ? 80 : 48 },
        // tabBarBackground: () => (
        //     <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
        //   ),
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="History" component={History} />
      <Tab.Screen name="Explore" component={DummySurf} />
      <Tab.Screen
        name="Inbox"
        component={ChannelList}
        options={{
          tabBarBadge: totalNotifications > 0 ? totalNotifications : undefined,
        }}
        initialParams={{ inChatFlow: false }}
      />
      <Tab.Screen name="Me" component={Me} />
    </Tab.Navigator>
  );
}

export default function RootNavigator({ session }) {
  const { showOnboarding, setShowOnboarding } = useAppContext();

  useEffect(() => {
    //   clearAllStorage();
    //   return;

    const checkIfOnboardingDone = async () => {
      try {
        const onboardingComplete = await getData("onboardingComplete");

        if (onboardingComplete === undefined) {
          console.log("onboarding status undefined in storage");

          const getProfile = async () => {
            try {
              const { data } = await supabase
                .from("profiles_test")
                .select("name")
                .eq("id", session?.user.id)
                .single();

              if (data) {
                if (data?.name != null) {
                  console.log("onboarding done, saving it in storage");
                  await storeData("onboardingComplete", true);
                } else {
                  console.log("onboarding not done");
                  setShowOnboarding(true);
                }
              }
            } catch (error: any) {
              console.log("Error getting profile:", error);
            }
          };

          getProfile();
        } else {
          console.log("onboarding status found in storage", onboardingComplete);
        }
      } catch (error) {
        console.error("Error checking onboarding status:", error);
      }
    };

    if (session) {
      checkIfOnboardingDone();
    }
  }, [session?.user.id]);

  useEffect(() => {
    const checkIfLookingForSet = async () => {
      const lookingFor = await getData("lookingFor");

      if (lookingFor === undefined) {
        console.log("looking for status undefined in storage, setting default");

        const { data } = await supabase
          .from("profiles_test")
          .select("looking_for")
          .eq("id", session?.user.id)
          .single();

        if (data) {
          if (data?.looking_for != null) {
            console.log("looking for found", data?.looking_for);
            await storeData("lookingFor", data?.looking_for);
          } else {
            console.log("looking for not found, setting default");
            await storeData("lookingFor", 1);
          }
        }
      } else {
        console.log("looking for status found in storage", lookingFor);
      }
    };

    if (session) {
      checkIfLookingForSet();
    }
  }, [session?.user.id]);

  return (
    // <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Main">
      {session ? (
        showOnboarding === true ? (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Group>
            <Stack.Group
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.BottomSheetAndroid,
              }}
            >
              <Stack.Screen name="Main" component={TabNavigator} />
              <Stack.Screen
                name="Surf"
                component={Surf}
                options={{
                  gestureEnabled: true,
                  gestureDirection: "vertical",
                  gestureResponseDistance: 400,
                }}
              />
              <Stack.Screen name="Dive" component={Dive} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="SearchFilters" component={SearchFilters} />
              <Stack.Screen
                name="ChatChannel"
                component={ChatChannel}
                options={{ headerShown: true }}
              />
              <Stack.Screen
                name="MyProfile"
                component={MyProfile}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EditNameAge"
                component={EditNameAge}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EditBio"
                component={EditBio}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EditGender"
                component={EditGender}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EditInterests"
                component={EditInterests}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EditLookingFor"
                component={EditLookingFor}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
              <Stack.Screen
                name="EditPronouns"
                component={EditPronouns}
                options={{
                  headerShown: false,
                  ...TransitionPresets.SlideFromRightIOS,
                }}
              />
            </Stack.Group>
            <Stack.Group
              screenOptions={{
                headerShown: false,
                ...TransitionPresets.SlideFromRightIOS,
              }}
            >
              <Stack.Screen
                name="filterGenderPreference"
                component={FilterGenderPreference}
              />
              <Stack.Screen name="filterStarsign" component={FilterStarsign} />
              <Stack.Screen name="filterAgeRange" component={FilterAgeRange} />
              <Stack.Screen name="filterBodyType" component={FilterBodyType} />
              <Stack.Screen
                name="filterExerciseFrequency"
                component={FilterExerciseFrequency}
              />
              <Stack.Screen
                name="filterSmokingFrequency"
                component={FilterSmokingFrequency}
              />
              <Stack.Screen
                name="filterDrinkingFrequency"
                component={FilterDrinkingFrequency}
              />
              <Stack.Screen
                name="filterCannabisFrequency"
                component={FilterCannabisFrequency}
              />
              <Stack.Screen
                name="filterDietPreference"
                component={FilterDietPreference}
              />
            </Stack.Group>
          </Stack.Group>
        )
      ) : (
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
    // </NavigationContainer>
  );
}





