import React, { useState } from 'react'
import { Alert, StyleSheet, View, TouchableOpacity } from 'react-native'
import { supabase } from '@/lib/supabase'
import { TextField, Text } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from './Spacer';
import { Textfield } from '@/components/ui/Textfields';
import { Pageview } from '@/components/ui/Containers';
import { useColorScheme } from "nativewind";

import { Image, Animated, FlatList, useWindowDimensions, ImageSourcePropType } from 'react-native';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './ui/Buttons';
import { useRef } from 'react';
import { defaultStyles } from '@/constants/Styles';





export default function Auth({ onboarding }: any) {
    const { colorScheme, setColorScheme } = useColorScheme();

    const [mode, setMode] = useState('welcome');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;


    const onboardingContent = [
        {
            id: 1,
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding1.png'),
        },
        {
            id: 2,
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding2.png'),
        },
        {
            id: 3,
            title: 'Step 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding3.png'),
        },
        {
            id: 4,
            title: 'Step 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding4.png'),
        },
        {
            id: 5,
            title: 'Step 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding5.png'),
        }
    ]

    interface OnboardingItem {
        id: number;
        title: string;
        description: string;
        image: ImageSourcePropType;
    }

    const { width } = useWindowDimensions();

    function renderItem({ item }: { item: OnboardingItem }) {
        return (
            <View className='bg-primary-300' >
                <Image source={item.image} style={{ width }} />
                {/* <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                </View> */}
            </View >
        )

    }


    const scrollX = useRef(new Animated.Value(0)).current;

    const Pagination = ({ count }: { count: number }) => {
        return (
            <View className='flex-row justify-center'>
                {Array(count).fill(0).map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#cccccc', '#7A37D0', '#cccccc'],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.View
                            key={index}
                            className='w-2 h-2 mx-1 rounded-full'
                            style={{ backgroundColor: dotColor }}
                        />
                    );
                })}
            </View>
        );
    };


    async function signInWithEmail() {
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format')
            return
        }
        if (!passwordRegex.test(password)) {
            Alert.alert('Password must be at least 6 characters long, contain one capital letter, and include both letters and numbers')
            return
        }
        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        if (error) Alert.alert(error.message)
        setLoading(false)
    }

    async function signUpWithEmail() {
        if (!emailRegex.test(email)) {
            Alert.alert('Invalid email format')
            return
        }
        if (!passwordRegex.test(password)) {
            Alert.alert('Password must be at least 6 characters long, contain one capital letter, and include both letters and numbers')
            return
        }
        setLoading(true)
        const { data: { session }, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        }
        //if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)


        if (session) {
            // User is logged in
            console.log('User is logged in:', session.user);
        } else {
            //Alert.alert('Please check your inbox for email verification!');
        }
    }

    return (
        <SafeAreaView>
            {mode === 'signin' && (

                <Pageview className='flex justify-space-between h-full gap-6'>
                    <View className='flex-1'>

                        <Text className='text-3xl font-bold'>Hello again!</Text>

                        <Spacer height={64} />

                        <Textfield
                            label={'E-Mail'}
                            onChangeText={(text) => setEmail(text)}
                            validate={['required', 'email', (value: string | any[]) => value.length > 6]}
                            validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                            enableErrors
                        />
                        <View className='flex-row items-center relative'>
                            <Textfield
                                label={'Password'}
                                secureTextEntry={!showPassword}
                                onChangeText={(text) => setPassword(text)}
                                validate={['required', (value: string | any[]) => value.length > 6]}
                                validationMessage={['Field is required', 'Password is too short']}
                                containerStyle={styles.passwordInput}
                            />
                        </View>

                        <Spacer height={64} />

                        <PrimaryButton onPress={() => signInWithEmail()}>
                            <PrimaryButtonText>Sign in</PrimaryButtonText>
                        </PrimaryButton>

                        <Spacer height={32} />

                        <TouchableOpacity
                            className='ml-4 mt-3'
                            onPress={() => { }}
                        >
                            <Text className='text-center text-primary-500'>Forgot password?</Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity
                        className='ml-4 mt-3'
                        onPress={() => setMode('signup')}
                    >
                        <Text className='text-center'>New here? <Text className='text-primary-500'>Create an account</Text></Text>
                    </TouchableOpacity>

                    <Spacer height={16} />

                    <TouchableOpacity
                        className='ml-4 mt-3'
                        onPress={() => setMode('welcome')}
                    >
                        <Text className='text-center text-primary-500'>Back to welcome screen</Text>
                    </TouchableOpacity>

                </Pageview >
            )}

            {mode === 'signup' && (

                <Pageview className='flex justify-space-between h-full gap-6'>
                    <View className='flex-1'>

                        <Text className='text-3xl font-bold'>Welcome!</Text>

                        <Spacer height={64} />

                        <Textfield
                            label={'E-Mail'}
                            onChangeText={(text) => setEmail(text)}
                            validate={['required', 'email', (value: string | any[]) => value.length > 6]}
                            validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                            enableErrors
                        />
                        <View className='flex-row items-center relative'>
                            <Textfield
                                label={'Password'}
                                secureTextEntry={!showPassword}
                                onChangeText={(text) => setPassword(text)}
                                validate={['required', (value: string | any[]) => value.length > 6]}
                                validationMessage={['Field is required', 'Password is too short']}
                                containerStyle={styles.passwordInput}
                            />
                            <TouchableOpacity
                                className='ml-4 mt-3'
                                onPress={() => setShowPassword(!showPassword)}
                            >
                                <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                            </TouchableOpacity>
                        </View>

                        <Spacer height={8} />

                        <Text className='text-gray-500 leading-5'>Minimum 6 characters, and one each: uppercase/lowercase letter, number, special character.</Text>

                        <Spacer height={64} />

                        <PrimaryButton onPress={() => signUpWithEmail()}>
                            <PrimaryButtonText>Sign up</PrimaryButtonText>
                        </PrimaryButton>

                        <Spacer height={16} />

                        <Text className='leading-5'>By signing up, you agree to our <Text className='text-primary-500'>Terms of Service</Text> and <Text className='text-primary-500'>Privacy Policy</Text>.</Text>

                    </View>

                    <TouchableOpacity
                        className='ml-4 mt-3'
                        onPress={() => setMode('signin')}
                    >
                        <Text className='text-center'>Already have an account? <Text className='text-primary-500'>Sign in</Text></Text>
                    </TouchableOpacity>

                    <Spacer height={16} />

                    <TouchableOpacity
                        className='ml-4 mt-3'
                        onPress={() => setMode('welcome')}
                    >
                        <Text className='text-center text-primary-500'>Back to welcome screen</Text>
                    </TouchableOpacity>

                    <Spacer height={16} />

                </Pageview >
            )}

            {mode === 'welcome' && (
                <View className='flex h-full justify-between'>
                    <View className='flex-1/0.7'>
                        <Spacer height={16} />
                        <Image source={require('@/assets/images/logo/logo_crushy.png')} className='m-auto' />
                        <FlatList
                            data={onboardingContent}
                            renderItem={renderItem}
                            keyExtractor={item => item.id.toString()}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            bounces={false}
                            onScroll={Animated.event(
                                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                { useNativeDriver: false }
                            )}
                        />
                        <Pagination count={onboardingContent.length} />
                    </View>
                    <View className='flex-1/0.3 p-6'>
                        <PrimaryButton onPress={() => setMode('signup')} style={defaultStyles.buttonShadow}>
                            <PrimaryButtonText>Create account</PrimaryButtonText>
                        </PrimaryButton>
                        <Spacer height={16} />
                        <SecondaryButton onPress={() => setMode('signin')} style={defaultStyles.buttonShadow}>
                            <SecondaryButtonText>Sign in</SecondaryButtonText>
                        </SecondaryButton>
                        <Spacer height={16} />
                    </View>
                </View>
            )}
        </SafeAreaView >
    )
}




const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 16,
        gap: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    passwordInput: {
        flex: 1,
    },
    showPasswordButton: {
        marginLeft: 10,
    },
    card: {
        padding: 16,
    },
    termsText: {

    },
    requirementText: {
        fontSize: 14,
        color: 'gray',
    },
})







