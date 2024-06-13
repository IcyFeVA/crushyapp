import { Image, StyleSheet, Button, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { Pageview } from '@/components/ui/Containers';
import Spacer from './Spacer';
import { FlatList } from 'react-native';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './ui/Buttons';
import React, { useRef, useState } from 'react';
import { Text } from 'react-native-ui-lib';
import { Textfield } from '@/components/ui/Textfields';


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
        <Text className='text-xl font-bold'>What is your name?</Text>
        <Spacer height={8} />
        <View className=''>
            <Text className='text-md'>This will be visible to all users. You can also choose a nickname if you would like.</Text>
        </View>

        <Spacer height={64} />

        <Text className='text-sm font-bold'>Firstname or Nickname</Text>
        <Spacer height={4} />
        <Textfield
        // onChangeText={(text) => setEmail(text)}
        />
    </View>
);

const StepTwo = () => (
    <View className='p-6 w-screen'>
        <Text>What is your name? sadf asdf asdf asdfasdfasdf dasfa sdfasd fasdf asdf s as</Text>
    </View>
);

const StepThree = () => (
    <View className='p-6 w-screen'>
        <Text>What is your name? sadf asdf asdf asdfasdfasdf dasfa sdfasd fasdf asdf s as</Text>
    </View>
);

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
