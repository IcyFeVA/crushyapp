import React, { useCallback, useEffect } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { RadioButton } from "react-native-ui-lib";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
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
    { id: '1', title: 'Male' },
    { id: '2', title: 'Female' },
    { id: '3', title: 'Male (Transgender)' },
    { id: '4', title: 'Female (Transgender)' },
    { id: '5', title: 'Non-binary' },
    { id: '6', title: 'Genderqueer' },
    { id: '7', title: 'Genderfluid' },
    { id: '8', title: 'Agender' },
    { id: '9', title: 'Two-Spirit' },
];

export default function filterGenderPreference() {
    const { searchFilters, setSearchFilters } = useAppContext();

    const handlePress = useCallback((key: string, value: string) => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            genderPreference: { key, value }
        }));
        storeData('genderPreference', { key, value })
            .then(() => {
                console.log('genderPreference:', value);
                setTimeout(() => router.dismiss(), 250);
            })
            .catch(error => console.error('Failed to save gender preference:', error));
    }, [setSearchFilters]);

    const renderItem = useCallback(({ item }: { item: typeof DATA[0] }) => {
        const color = item.id === searchFilters.genderPreference.key ? Colors.light.text : Colors.light.tertiary;

        return (
            <RadioButton
                label={item.title}
                size={20}
                color={color}
                contentOnLeft
                containerStyle={[defaultStyles.radioButton, { borderColor: color }]}
                labelStyle={defaultStyles.radioButtonLabel}
                selected={searchFilters.genderPreference.key === item.id}
                onPress={() => handlePress(item.id, item.title)}
                accessibilityLabel={`Select ${item.title}`}
            />
        );
    }, [searchFilters.genderPreference, handlePress]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={defaultStyles.h2}>Gender preference</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>In the future, you will be able to choose more specific genders.</Text>
                <Spacer height={48} />
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={searchFilters.genderPreference}
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
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },


});
