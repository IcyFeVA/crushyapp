import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from '@/constants/Colors'
import { Button, Card, ListItem } from 'react-native-ui-lib'
import Spacer from '@/components/Spacer'
import { router } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'

export default function searchFilters() {
    const [genderPreferenceKey, setGenderPreferenceKey] = useState(null);
    const [genderPreferenceValue, setGenderPreferenceValue] = useState('-');



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <ScrollView style={styles.innerContainer}>
                <Card flex center onPress={() => console.log('pressed me')} enableShadow={false} style={{ backgroundColor: 'transparent' }}>
                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 20 }}>Search Filters (4)</Text>
                </Card>

                <Spacer height={24} />

                <Button onPress={() => router.push('matching-prefs/setGenderPreference')} style={[defaultStyles.button, defaultStyles.noRadius, styles.firstItem]}>
                    <Text style={defaultStyles.buttonLabel}>Gender</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>{genderPreferenceValue}</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Age</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>30-40</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius, styles.lastItem]}>
                    <Text style={defaultStyles.buttonLabel}>Distance</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>60 km</Text>
                </Button>

                <Spacer height={32} />

                <Text style={{ fontFamily: 'BodyBold', fontSize: 14, lineHeight: 22, color: Colors.light.textSecondary, textAlign: 'center' }}>MORE ABOUT YOUR IDEAL MATCH</Text>

                <Spacer height={8} />

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius, styles.firstItem]}>
                    <Text style={defaultStyles.buttonLabel}>Interests</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>Basketball +2</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Has a bio</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Pronounce</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Sexual Orientation</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Starsign</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Accendant</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Some more here</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>And there</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>Everywhere</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius]}>
                    <Text style={defaultStyles.buttonLabel}>All at</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>

                <Button onPress={() => console.log('pressed')} style={[defaultStyles.button, defaultStyles.noRadius, styles.lastItem]}>
                    <Text style={defaultStyles.buttonLabel}>Once</Text>
                    <Text style={[defaultStyles.buttonLabel, styles.active]}>-</Text>
                </Button>
            </ScrollView>
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



