import { Image, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { Pageview } from '@/components/ui/Containers';
import Spacer from './Spacer';
import { FlatList } from 'react-native';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './ui/Buttons';
import React, { useRef, useState } from 'react';
import { View, Card, CardProps, Text, RadioButton } from 'react-native-ui-lib';
import { Textfield } from '@/components/ui/Textfields';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';


const Onboarding = ({ session }: { session: Session }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const flatListRef = useRef(null);

    const steps = [
        { key: '1', title: 'Step 1', component: StepOne },
        { key: '2', title: 'Step 2', component: StepTwo },
        { key: '3', title: 'Step 3', component: StepThree },
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            if (flatListRef.current) {
                // flatListRef.current.scrollToIndex({ index: currentStep + 1 });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            if (flatListRef.current) {
                // flatListRef.current.scrollToIndex({ index: currentStep - 1 });
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
                    renderItem={({ item }) => (
                        <item.component />
                    )}
                    keyExtractor={item => item.key}
                />
                <View style={styles.buttonContainer}>
                    {currentStep > 0 && <Button title="Back" onPress={handleBack} />}
                    {currentStep < steps.length - 1 ? (
                        <Button title="Next" onPress={handleNext} />
                    ) : (
                        <Button title="Done" onPress={() => console.log('Form Submitted')} />
                    )}
                </View>
            </View>
        </SafeAreaView>
    );
};



const StepOne = () => (
    <View className='p-6 w-screen'>
        <Text className='text-2xl font-bold'>What is your name?</Text>
        <Spacer height={8} />
        <View className=''>
            <Text className='text-base'>This will be visible to all users. You can also choose a nickname if you would like.</Text>
        </View>

        <Spacer height={64} />

        <Text className='text-md font-bold'>Firstname or Nickname</Text>
        <Spacer height={4} />
        <Textfield
        // onChangeText={(text) => setEmail(text)}
        />
    </View>
);

const StepTwo = () => (
    <View className='p-6 w-screen'>
        <Text className='text-2xl font-bold'>In what year were you born?</Text>
        <Spacer height={8} />
        <View className=''>
            <Text className='text-base'>You can always change your settings later.</Text>
        </View>

        <Spacer height={64} />

        <Text className='text-md font-bold'>Year of birth</Text>
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


const StepThree = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        console.log('Selected Value:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Text className='text-2xl' style={{ fontFamily: 'HeadingBold' }}>How do you identify in terms of gender?</Text>
            <Spacer height={8} />
            <View>
                <Text className='text-base' style={{ fontFamily: 'BodyRegular' }}>We strive for inclusivity. If you don't see a gender that fits you, please let us know.</Text>
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
                        color={selectedValue === item.key ? Colors.light.accent : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.accent : Colors.light.tertiary }]}
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
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // marginTop: 16,
    },
});

export default Onboarding;
