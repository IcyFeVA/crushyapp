import React, { useCallback } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { useAppContext } from '@/providers/AppProvider';

type ItemData = {
    id: string;
    title: string;
};

const DATA: ItemData[] = [
    { id: '1', title: 'Aries' },
    { id: '2', title: 'Taurus' },
    { id: '3', title: 'Gemini' },
    { id: '4', title: 'Cancer' },
    { id: '5', title: 'Leo' },
    { id: '6', title: 'Virgo' },
    { id: '7', title: 'Libra' },
    { id: '8', title: 'Scorpio' },
    { id: '9', title: 'Sagittarius' },
    { id: '10', title: 'Capricorn' },
    { id: '11', title: 'Aquarius' },
    { id: '12', title: 'Pisces' },
];

export default function FilterStarSign() {
    const { searchFilters, setSearchFilters } = useAppContext();

    const handlePress = useCallback((key: string, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            starSignPreference: { key, value }
        }));
        storeData('starSignPreference', { key, value })
            .then(() => {
                console.log('starSignPreference:', key, value);
                // setTimeout(() => router.dismiss(), 250);
            })
            .catch(error => console.error('Failed to save star sign preference:', error));
    }, [setSearchFilters]);

    const renderItem = useCallback(({ item }: { item: typeof DATA[0] }) => {
        const color = item.id === searchFilters.starSignPreference.key ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.title}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={searchFilters.starSignPreference.key === item.id}
                onPress={() => handlePress(item.id, item.title)}
                accessibilityLabel={`Select ${item.title}`}
            />
        );
    }, [searchFilters.starSignPreference, handlePress]);

    return (
        <SafeAreaView style={defaultStyles.SafeAreaView}>
            <View style={defaultStyles.innerContainer}>
                <Text style={defaultStyles.h2}>Star Sign Preference</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Select your preferred star sign for potential matches.</Text>
                <Spacer height={48} />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={searchFilters.starSignPreference}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    );
}

// ... styles remain the same ...

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
        borderRadius: 0,
        borderTopWidth: 0,
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
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        borderTopWidth: 1,

    },
    lastItem: {
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderTopWidth: 0,
    },
    active: {
        color: Colors.light.primary,
    },



});
