import { Text, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Card, ListItem, RadioButton } from "react-native-ui-lib";
import Spacer from "@/components/Spacer";
import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { storeData } from '@/utils/storage';



export default function setGenderPreference() {

    const [selectedId, setSelectedId] = useState<string>('');

    const handlePress = (key: string, value: string) => {
        setSelectedId(key);
        storeData('genderPreference', { key, value });
        console.log('genderPreference:', value);
        setTimeout(() => {
            return router.dismiss();
        }, 250);
    };


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
    ]

    type ItemProps = {
        item: ItemData;
        onPress: () => void;
        textColor: string;
    };



    const Item = ({ item, onPress, textColor }: ItemProps) => (
        <RadioButton
            label={item.title}
            size={20}
            color={textColor}
            contentOnLeft
            containerStyle={[defaultStyles.radioButton, { borderColor: selectedId === item.id ? Colors.light.text : Colors.light.tertiary }]}
            labelStyle={defaultStyles.radioButtonLabel}
            selected={selectedId === item.id}
            onPress={onPress}
        />
    );


    const renderItem = ({ item }: { item: ItemData }) => {
        const color = item.id === selectedId ? Colors.light.text : Colors.light.tertiary

        return (
            <Item
                item={item}
                onPress={() => handlePress(item.id, item.title)}
                textColor={color}
            />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View className='flex-1 p-6 w-screen'>

                <Text style={defaultStyles.h2}>Gender preference</Text>

                <Spacer height={8} />

                <View>
                    <Text style={defaultStyles.body}>In the future, you will be able to choose more specific genders.</Text>
                </View>

                <Spacer height={48} />

                <FlatList
                    className='py-4'
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    extraData={selectedId}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                />
            </View >
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
        padding: 24,
        backgroundColor: 'grey',
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },


});
