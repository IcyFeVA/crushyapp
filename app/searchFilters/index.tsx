import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { Button, Card, ListItem } from 'react-native-ui-lib'
import Spacer from '@/components/Spacer'
import { useFocusEffect } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import { getData, resetUserSearchFilters } from '@/utils/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppContext } from '@/providers/AppProvider'
import { useNavigation } from '@react-navigation/native'

    // Start of Selection
    const convertFilters = (filters: Record<string, any>): Record<string, any> => {
      const convertedFilters: Record<string, any> = {};
      const keyMappings: Record<string, string> = {
        starSignPreference: "zodiac_sign",
        bodyTypePreference: "body_type",
        ageRange: "age_range",
        distance: "distance",
        genderPreference: "gender",
        exerciseFrequency: "exercise_frequency",
        smokingFrequency: "smoking_frequency",
        drinkingFrequency: "drinking_frequency",
        cannabisFrequency: "cannabis_frequency",
        dietPreference: "diet_preference",
      };
    
      for (const [key, value] of Object.entries(filters)) {
        const newKey = keyMappings[key] || key;
        if (value.key && value.key !== "") {
          const intValue = parseInt(value.key, 10);
          convertedFilters[newKey] = isNaN(intValue) ? value.key : intValue;
        } else if (value.value && value.value !== "-") {
          if (key === "ageRange") {
            const [min, max] = value.value.split("-").map((num: string) => parseInt(num, 10));
            convertedFilters[newKey] = {
              min: isNaN(min) ? null : min,
              max: isNaN(max) ? null : max,
            };
          } else {
            const intValue = parseInt(value.value, 10);
            convertedFilters[newKey] = isNaN(intValue) ? value.value : intValue;
          }
        } else {
          convertedFilters[newKey] = null;
        }
      }
    
      return convertedFilters;
    };

export default function SearchFilters() {
  const { searchFilters, setSearchFilters, resetFilters, setAllSearchFilters } = useAppContext();
  const navigation = useNavigation();

  const getMultiple = async () => {
    try {
      const values = await AsyncStorage.multiGet([
        "genderPreference",
        "ageRange",
        "distance",
        "starSignPreference",
        "bodyTypePreference",
        "cannabisFrequency",
        "dietPreference",
      ]);

      const newFilters = { ...searchFilters };
      values.forEach(([key, value]) => {
        if (value) {
          newFilters[key] = JSON.parse(value);
        }
      });
    //   console.log("convertedFilters", convertedFilters);
        setAllSearchFilters({zodiac_sign: newFilters.starSignPreference.key, body_type: newFilters.bodyTypePreference.key});
        setSearchFilters(newFilters);
    } catch (e) {
      console.error("Error reading values", e);
    }
  };

  const resetSettings = async () => {
    await resetUserSearchFilters();
    resetFilters();
    getMultiple();
  };

  useFocusEffect(
    useCallback(() => {
      getMultiple();
    }, [])
  );

  return (
    <SafeAreaView style={defaultStyles.SafeAreaView}>
      <View style={defaultStyles.innerContainer}>
        <Card
          onPress={() => console.log("pressed me")}
          enableShadow={false}
          style={{
            display: "flex",
            height: 60,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <Text style={{ fontFamily: "HeadingBold", fontSize: 20 }}>
            Search Filters
          </Text>
        </Card>

        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <Button
            onPress={() => navigation.navigate("filterGenderPreference")}
            style={[
              defaultStyles.settingListButton,
              defaultStyles.noRadius,
              styles.firstItem,
            ]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Gender</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.genderPreference.value.length === 0
                ? "-"
                : searchFilters.genderPreference.value.length === 1
                ? searchFilters.genderPreference.value[0]
                : searchFilters.genderPreference.value[0] +
                  " +" +
                  (searchFilters.genderPreference.value.length - 1)}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterAgeRange")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Age Range</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.ageRange.min}-{searchFilters.ageRange.max}
            </Text>
          </Button>
          <Button
            onPress={() => console.log("pressed")}
            style={[
              defaultStyles.settingListButton,
              defaultStyles.noRadius,
              styles.lastItem,
            ]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Distance</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.distance.value} km
            </Text>
          </Button>
          <Spacer height={32} />
          <Text
            style={{
              fontFamily: "BodyBold",
              fontSize: 14,
              lineHeight: 22,
              color: Colors.light.textSecondary,
              textAlign: "center",
            }}
          >
            MORE ABOUT YOUR IDEAL MATCH
          </Text>
          <Spacer height={8} />

          <Button
            onPress={() => console.log("pressed")}
            style={[
              defaultStyles.settingListButton,
              defaultStyles.noRadius,
              styles.firstItem,
            ]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Interests</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              -
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterBodyType")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Body Type</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.bodyTypePreference.value}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterStarsign")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Star Sign</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.starSignPreference.value}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterExerciseFrequency")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>
              Working out
            </Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.exerciseFrequency.value}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterSmokingFrequency")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Smoking</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.smokingFrequency.value}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterDrinkingFrequency")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Drinking</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.drinkingFrequency.value}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterCannabisFrequency")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Cannabis</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.cannabisFrequency.value}
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate("filterDietPreference")}
            style={[defaultStyles.settingListButton, defaultStyles.noRadius]}
          >
            <Text style={defaultStyles.settingListButtonLabel}>Diet</Text>
            <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
              {searchFilters.dietPreference.value}
            </Text>
          </Button>
        </ScrollView>

        <Spacer height={16} />

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            gap: 8,
          }}
        >
          <Button
            onPress={() => resetSettings()}
            style={[
              defaultStyles.button,
              defaultStyles.buttonShadow,
              { flex: 1 },
            ]}
          >
            <Text style={defaultStyles.buttonLabel}>Reset</Text>
          </Button>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            style={[
              defaultStyles.button,
              defaultStyles.buttonShadow,
              { flex: 1 },
            ]}
          >
            <Text style={defaultStyles.buttonLabel}>Save</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
    bottomSheet: {
        padding: 16,
    },
    bottomSheetListItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.light.tertiary,
        borderWidth: 1,
        borderTopWidth: 0,
        padding: 16,
        borderRadius: 8,
        backgroundColor: Colors.light.background,
    },
    bottomSheetListItemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLabel: {
        fontFamily: 'BodySemiBold',
        fontSize: 16,
        paddingHorizontal: 16,
    },
    firstItem: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'grey',
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },


});



