import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { Button, Card, ListItem } from 'react-native-ui-lib'
import Spacer from '@/components/Spacer'
import { router, useFocusEffect } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import { getData, resetUserSearchFilters } from '@/utils/storage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAppContext } from '@/providers/AppProvider'
import { useNavigation } from '@react-navigation/native'

export default function SearchFilters() {
    const { searchFilters, setSearchFilters, resetFilters } = useAppContext();
    const navigation = useNavigation();

    const getMultiple = async () => {
        try {
            const values = await AsyncStorage.multiGet(['genderPreference', 'ageRange', 'distance', 'starSignPreference'])
            const newFilters = { ...searchFilters };
            values.forEach(([key, value]) => {
                if (value) {
                    newFilters[key] = JSON.parse(value);
                }
            });
            console.log('newFilters', newFilters);
            setSearchFilters(newFilters);
        } catch (e) {
            console.error('Error reading values', e);
        }
    }

    const resetSettings = async () => {
        await resetUserSearchFilters()
        resetFilters();
        getMultiple();
    }

    useFocusEffect(
        useCallback(() => {
            getMultiple()
        }, [])
    );

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Card onPress={() => console.log('pressed me')} enableShadow={false} style={{ display: 'flex', height: 60, alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 20 }}>Search Filters</Text>
                </Card>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Button onPress={() => navigation.navigate('filterGenderPreference')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.firstItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Gender</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>
                            {
                                searchFilters.genderPreference.value.length === 0 ? '-' :
                                    searchFilters.genderPreference.value.length === 1 ? searchFilters.genderPreference.value[0] :
                                        searchFilters.genderPreference.value[0] + ' +' + (searchFilters.genderPreference.value.length - 1)
                            }
                        </Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterAgeRange')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Age Range</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.ageRange.min}-{searchFilters.ageRange.max}</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.lastItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Distance</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.distance.value} km</Text>
                    </Button>
                    <Spacer height={32} />
                    <Text style={{ fontFamily: 'BodyBold', fontSize: 14, lineHeight: 22, color: Colors.light.textSecondary, textAlign: 'center' }}>MORE ABOUT YOUR IDEAL MATCH</Text>
                    <Spacer height={8} />
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.firstItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Interests</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>Basketball +2</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Has a bio</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Pronounce</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Sexual Orientation</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('filterStarsign')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Zodiac Sign</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{searchFilters.starSignPreference.value}</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Accendant</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Some more here</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>And there</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Everywhere</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>All at</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.lastItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Once</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
                    </Button>
                </ScrollView>

                <Spacer height={16} />

                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: 8 }}>
                    <Button onPress={() => resetSettings()} style={[defaultStyles.button, defaultStyles.buttonShadow]}>
                        <Text style={defaultStyles.buttonLabel}>Reset</Text>
                    </Button>
                    <Button onPress={() => router.dismiss()} style={[defaultStyles.button, defaultStyles.buttonShadow]}>
                        <Text style={defaultStyles.buttonLabel}>Save</Text>
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    )
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



