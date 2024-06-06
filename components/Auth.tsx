import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TouchableOpacity, Pressable, TextInput } from 'react-native'
import { supabase } from '@/lib/supabase'
import { TextField, Text, Button, ThemeManager, Card } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';

import { Typography, Colors, Spacings, ActionBar } from 'react-native-ui-lib';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from './Spacer';

import { useColorScheme } from "nativewind";
import { styled } from 'nativewind';

const StyledView = styled(View, 'flex-1 items-center justify-center');
const PrimaryButton = styled(Button, 'w-full h-12 rounded-lg justify-center bg-primary-600');
const PrimaryButtonText = styled(Text, 'uppercase text-center text-white font-bold');
const SecondaryButton = styled(Button, 'w-full h-12 rounded-4 justify-center bg-white border border-primary-500');
const SecondaryButtonText = styled(Text, 'text-center text-pink-500 font-bold active:text-primary-700');

// Set default colors and border radius 
// ThemeManager.setComponentTheme('Button', {
//     backgroundColor: '#CD385C',
//     borderRadius: 8,
//     labelStyle: {
//         color: 'white',
//     },
// });

// ThemeManager.setComponentTheme('TextField', {
//     floatingPlaceholderStyle: {
//         fontSize: 18,
//     },
//     floatingPlaceholderColor: {
//         focus: '#CD385C',
//         default: 'gray',
//     },
//     underlineColor: {
//         focus: '#CD385C',
//         default: 'gray',
//     },
//     style: {
//         fontSize: 18,
//         borderBottomColor: 'gray',
//         borderBottomWidth: 1,
//     }
// });

// Colors.loadColors({
//     pink: '#FF69B4',
//     gold: '#FFD700',
// });

// Typography.loadTypographies({
//     h1: { fontSize: 58, fontWeight: '300', lineHeight: 80 },
//     h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
// });

// Spacings.loadSpacings({
//     page: 8
// });

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh()
    } else {
        supabase.auth.stopAutoRefresh()
    }
})

export default function Auth() {
    const { colorScheme, setColorScheme } = useColorScheme();

    const [mode, setMode] = useState('signup');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

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
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            Alert.alert(error.message)
            console.log(error.message)
        }
        //if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return (
        <SafeAreaView>
            {mode === 'login' && (

                <View className='flex p-6 justify-space-between h-screen gap-6'>
                    <View className='flex-1'>

                        <Text className='text-3xl font-bold'>Hello again!</Text>

                        <Spacer height={64} />

                        <TextField
                            className='w-full radius-4 text-lg bg-gray-100 p-2 rounded-lg'
                            label={'E-Mail'}
                            onChangeText={(text) => setEmail(text)}
                            validate={['required', 'email', (value: string | any[]) => value.length > 6]}
                            validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                            enableErrors
                        />
                        <View className='flex-row items-center relative'>
                            <TextField
                                className='w-full radius-4 text-lg bg-gray-100 p-2 rounded-lg'
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

                </View >
            )}

            {mode === 'signup' && (

                <View className='flex p-6 justify-space-between h-screen gap-6'>
                    <View className='flex-1'>

                        <Text className='text-3xl font-bold'>Welcome!</Text>

                        <Spacer height={64} />

                        <TextField
                            className='w-full radius-4 text-lg bg-gray-100 p-2 rounded-lg'
                            label={'E-Mail'}
                            onChangeText={(text) => setEmail(text)}
                            validate={['required', 'email', (value: string | any[]) => value.length > 6]}
                            validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                            enableErrors
                        />
                        <View className='flex-row items-center relative'>
                            <TextField
                                className='w-full radius-4 text-lg bg-gray-100 p-2 rounded-lg'
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
                        onPress={() => setMode('login')}
                    >
                        <Text className='text-center'>Already have an account? <Text className='text-primary-500'>Sign in</Text></Text>
                    </TouchableOpacity>

                </View >
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
