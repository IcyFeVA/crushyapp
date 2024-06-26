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

export default function searchFilters() {
    const [genderPreference, setGenderPreference] = useState<{ key: string; value: string }>({ key: '', value: '' });
    const [ageRange, setAgeRange] = useState<{ key: string; value: string }>({ key: '', value: '' });
    const [distance, setDistance] = useState<{ key: string; value: string }>({ key: '', value: '' });

    const getMultiple = async () => {

        let values
        try {
            values = await AsyncStorage.multiGet(['genderPreference', 'ageRange', 'distance'])
        } catch (e) {
            // read error
        }
        values?.map((result, i, store) => {
            let key = store[i][0]
            let value = store[i][1]
            if (key == 'genderPreference') {
                setGenderPreference(JSON.parse(value))
            }
            if (key == 'ageRange') {
                setAgeRange(JSON.parse(value))
            }
            if (key == 'distance') {
                setDistance(JSON.parse(value))
            }
        })
    }

    const resetSettings = async () => {
        await resetUserSearchFilters()
        getMultiple()
    }

    useFocusEffect(
        useCallback(() => {

            getMultiple()

        }, [])
    );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.innerContainer}>
                <Card onPress={() => console.log('pressed me')} enableShadow={false} style={{ display: 'flex', height: 60, alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 20 }}>Search Filters (4)</Text>
                </Card>

                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                    <Button onPress={() => router.push('matching-prefs/setGenderPreference')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.firstItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Gender</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{genderPreference.value}</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Age</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{ageRange.value}</Text>
                    </Button>
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius, styles.lastItem]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Distance</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>{distance.value} km</Text>
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
                    <Button onPress={() => console.log('pressed')} style={[defaultStyles.settingListButton, defaultStyles.noRadius]}>
                        <Text style={defaultStyles.settingListButtonLabel}>Starsign</Text>
                        <Text style={[defaultStyles.settingListButtonLabel, styles.active]}>-</Text>
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
                    <Button onPress={() => resetSettings()} style={[defaultStyles.buttonSecondary]}>
                        <Text style={defaultStyles.buttonSecondaryLabel}>Reset</Text>
                    </Button>
                    <Button onPress={() => router.dismiss()} style={[defaultStyles.button]}>
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



