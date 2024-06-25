import { Text, StyleSheet, FlatList, View } from 'react-native';
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

    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        storeData('genderPreference', value);
        console.log('Gender:', value);
        return router.dismiss();
    };



    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View className='p-6 w-screen'>

                <Text style={defaultStyles.h2}>Gender preference</Text>
                <Spacer height={8} />
                <View>
                    <Text style={defaultStyles.body}>In the future you will be able to choose more than one option.</Text>
                </View>

                <Spacer height={48} />

                <FlatList
                    className='py-4'
                    data={[
                        { key: '1', title: 'Male' },
                        { key: '2', title: 'Female' },
                        { key: '3', title: 'Male (Transgender)' },
                        { key: '4', title: 'Female (Transgender)' },
                        { key: '5', title: 'Non-binary' },
                        { key: '6', title: 'Genderqueer' },
                        { key: '7', title: 'Genderfluid' },
                        { key: '8', title: 'Agender' },
                        { key: '9', title: 'Two-Spirit' },
                    ]}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <RadioButton
                            label={item.title}
                            size={20}
                            color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                            contentOnLeft
                            containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                            labelStyle={defaultStyles.radioButtonLabel}
                            selected={selectedValue === item.key}
                            onPress={() => handlePress(item.key)}
                        />
                    )}
                    keyExtractor={item => item.key}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
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
