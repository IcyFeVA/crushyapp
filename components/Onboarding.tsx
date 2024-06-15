import { Image, StyleSheet, Button, Pressable, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { Pageview } from '@/components/ui/Containers';
import Spacer from './Spacer';
import { FlatList } from 'react-native';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './ui/Buttons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Card, CardProps, Text, RadioButton, Checkbox } from 'react-native-ui-lib';
import { Textfield } from '@/components/ui/Textfields';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Toast, { ToastRef } from 'react-native-toast-message';
import hobbiesInterests from '@/constants/Interests';
import BigList from "react-native-big-list"

const screenWidth = Dimensions.get('window').width;

const Onboarding = ({ toastConfig, session }: { toastConfig: any, session: Session }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const flatListRef = useRef(null);

    const steps: object[] = [
        { key: '1', title: 'Step 1', component: StepName },
        { key: '2', title: 'Step 2', component: StepAge },
        { key: '3', title: 'Step 3', component: StepGender },
        { key: '4', title: 'Step 4', component: StepPronouns },
        { key: '6', title: 'Step 6', component: StepRelationship },
        { key: '7', title: 'Step 7', component: StepGenderPreferences },
        { key: '8', title: 'Step 8', component: StepInterests },
    ];



    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: currentStep + 1 });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: currentStep - 1 });
            }
        }
    };

    return (
        <SafeAreaView>
            <View className='flex h-full justify-between'>
                <FlatList
                    ref={flatListRef}
                    data={steps}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    // scrollEnabled={false}
                    renderItem={({ item }) => React.createElement(item.component)}
                    keyExtractor={item => item.key}
                />
                <View style={styles.buttonContainer}>
                    {currentStep > 0 ? (
                        <SecondaryButton onPress={handleBack}>
                            <SecondaryButtonText>Back</SecondaryButtonText>
                        </SecondaryButton>
                    ) : (
                        <SecondaryButton disabled className=' bg-gray-100 border-gray-100'>
                            <SecondaryButtonText className='text-gray-400'>Back</SecondaryButtonText>
                        </SecondaryButton>
                    )}
                    {currentStep < steps.length - 1 ? (
                        <PrimaryButton onPress={handleNext}>
                            <PrimaryButtonText>Next</PrimaryButtonText>
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton onPress={() => console.log('Form Submitted')}>
                            <PrimaryButtonText>Done</PrimaryButtonText>
                        </PrimaryButton>
                    )}
                </View>
                <Toast config={toastConfig} />
            </View>
        </SafeAreaView>
    );
};



function Progress({ percent }: { percent: number }) {
    return (
        <View className='w-full h-2 bg-gray-200 rounded-full relative'>
            <View style={{ width: `${percent}%` }} className='h-2 absolute  bg-accent-500 rounded-full'></View>
        </View>
    )
}


const StepName = () => {
    const [name, setName] = useState<string>('');

    return (
        <View className='p-6 w-screen'>

            <Spacer height={16} />

            <Progress percent={11} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What is your name?</Text>
            <Spacer height={8} />
            <View className=''>
                <Text style={defaultStyles.body}>This will be visible to all users. You can also choose a nickname if you would like.</Text>
            </View>

            <Spacer height={64} />

            <Text style={defaultStyles.inputLabel}>Firstname or Nickname</Text>
            <Spacer height={4} />
            <Textfield
                onChangeText={(text) => setName(text)}
            />
        </View>
    )
};

const StepAge = () => (
    <View className='p-6 w-screen'>
        <Spacer height={16} />

        <Progress percent={22} />

        <Spacer height={48} />

        <Text style={defaultStyles.h2}>In what year were you born?</Text>
        <Spacer height={8} />
        <View className=''>
            <Text style={defaultStyles.body}>You can always change your settings later.</Text>
        </View>

        <Spacer height={64} />

        <Text style={defaultStyles.inputLabel}>Year of birth</Text>
        <Spacer height={4} />
        <Textfield
            className='w-28 text-center'
            placeholder='YYYY'
            keyboardType='numeric'
            maxLength={4}
        // onChangeText={(text) => setEmail(text)}
        />
    </View>
);

const StepGender = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        console.log('Selected Value:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={33} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>How do you identify in terms of gender?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>We strive for inclusivity. If you don't see a gender that fits you, please let us know.</Text>
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
    );
};

const StepPronouns = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handlePress = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            if (selectedValues.length > 1) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'You can only select two pronouns',
                });
                return;
            }
            setSelectedValues([...selectedValues, value]);
        }
    };

    useEffect(() => {
        console.log('Selected Values:', selectedValues);
    }, [selectedValues]);

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={44} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are your pronouns?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>Choose <Text style={defaultStyles.bodyBold}>up to two</Text> pronouns.You will be able to add your own in a future update, if you don't see yours.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'he/him' },
                    { key: '2', title: 'she/her' },
                    { key: '3', title: 'they/them' },
                    { key: '4', title: 'ze/zir' },
                    { key: '5', title: 'xe/xem' },
                    { key: '6', title: 've/ver' },
                    { key: '7', title: 'ey/em' },
                    { key: '99', title: 'other' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item.key)}>
                        <Checkbox
                            color={selectedValues.includes(item.key) ? Colors.light.text : Colors.light.tertiary}
                            label={item.title}
                            value={selectedValues.includes(item.key) ? true : false}
                            containerStyle={[defaultStyles.checkboxButton, { borderColor: selectedValues.includes(item.key) ? Colors.light.text : Colors.light.tertiary }]}
                            labelStyle={defaultStyles.checkboxButtonLabel}
                        />
                    </Pressable>
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepRelationship = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        console.log('Selected Value:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={55} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are you looking for right now?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>You can always change your settings later.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Relationship' },
                    { key: '2', title: 'Friend' },
                    { key: '3', title: 'Hookup' },
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
    );
};

const StepGenderPreferences = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        console.log('Selected Value:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={66} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are your gender preferences?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>Please understand that this app is new. We will include more gender filters soon!</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Female' },
                    { key: '2', title: 'Male' },
                    { key: '3', title: 'Both' },
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
    );
};

const StepInterests = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handlePress = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    useEffect(() => {
        console.log('Selected Values:', selectedValues);
    }, [selectedValues]);

    const renderItem = ({ item }: { item: { label: string, value: string } }) => (
        // <Pressable onPress={() => handlePress(item.value)} >
        <Checkbox
            color={selectedValues.includes(item.value) ? Colors.light.text : Colors.light.tertiary}
            label={item.label}
            value={selectedValues.includes(item.value)}
            containerStyle={[defaultStyles.checkboxButton]}
            labelStyle={defaultStyles.checkboxButtonLabel}
            onValueChange={() => handlePress(item.value)}
        />
        // </Pressable >
    );

    const ITEM_HEIGHT = 75;

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={77} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>Interests ({selectedValues.length})</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>
                    This helps us find people with similar interests
                </Text>
            </View>

            <Spacer height={48} />

            <BigList
                // data={hobbiesInterests}
                sections={hobbiesInterests}
                renderItem={renderItem}
                renderSectionHeader={(section) => {
                    const categories = [
                        "Outdoor Activities",
                        "Sports & Fitness",
                        "Creative Arts",
                        "Entertainment & Media",
                        "Culinary Interests",
                        "Social Activities",
                        "Tech & Science",
                        "Intellectual Pursuits",
                        "Nature & Animals",
                        "Miscellaneous"
                    ];
                    return (
                        <View style={{ backgroundColor: Colors.light.white }}>
                            <Text style={{ fontFamily: 'HeadingBold', fontSize: 20, color: Colors.light.accent }}>{categories[section]}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.value}

                // ListHeaderComponent={`renderHeader`} // Replaceable with `renderHeader`
                // ListFooterComponent={<Spacer height={48} />}
                // ListEmptyComponent={`renderEmpty`} // Replaceable with `renderEmpty`

                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })} // Replaceable with `itemHeight={ITEM_HEIGHT}`
                headerHeight={0} // Default 0, need to specify the header height
                footerHeight={48} // Default 0, need to specify the foorer height
                sectionHeaderHeight={48}
            />
        </View>
    );
};




const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 16,
    },
    stepContainer: {
        // width: '100%',
        // alignItems: 'center',
    },
    title: {
        // fontSize: 24,
        // marginBottom: 16,
    },
    formStep: {
        // width: '100%',
        // padding: 16,
    },
    input: {
        // height: 40,
        // borderColor: 'gray',
        // borderWidth: 1,
        // marginBottom: 12,
        // paddingHorizontal: 8,
        // width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        width: screenWidth * 0.5 - 20,
        marginHorizontal: 16,
        marginBottom: 16,
    },
});

export default Onboarding;


