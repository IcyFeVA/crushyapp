import React, { useState } from 'react'
import { Alert, StyleSheet, View, AppState, TouchableOpacity } from 'react-native'
import { supabase } from '@/lib/supabase'
import { TextField, Text, Button, ThemeManager, Card } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';

import { Typography, Colors, Spacings, ActionBar } from 'react-native-ui-lib';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from './Spacer';

// Set default colors and border radius
ThemeManager.setComponentTheme('Button', {
    backgroundColor: '#CD385C',
    borderRadius: 8,
    labelStyle: {
        color: 'white',
    },
});

ThemeManager.setComponentTheme('TextField', {
    floatingPlaceholderStyle: {
        fontSize: 18,
    },
    floatingPlaceholderColor: {
        focus: '#CD385C',
        default: 'gray',
    },
    underlineColor: {
        focus: '#CD385C',
        default: 'gray',
    },
    style: {
        fontSize: 18,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    }
});

Colors.loadColors({
    pink: '#FF69B4',
    gold: '#FFD700',
});

Typography.loadTypographies({
    h1: { fontSize: 58, fontWeight: '300', lineHeight: 80 },
    h2: { fontSize: 46, fontWeight: '300', lineHeight: 64 },
});

Spacings.loadSpacings({
    page: 16
});

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
            <ThemedView>
                <View style={styles.container}>
                    {/* <Card style={styles.card}> */}
                    <TextField
                        label={'E-Mail'}
                        placeholder={'E-Mail'}
                        floatingPlaceholder
                        onChangeText={(text) => setEmail(text)}
                        validate={['required', 'email', (value: string | any[]) => value.length > 6]}
                        validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                        enableErrors
                    />
                    <View style={styles.passwordContainer}>
                        <TextField
                            label={'Password'}
                            placeholder={'Password'}
                            floatingPlaceholder
                            secureTextEntry={!showPassword}
                            onChangeText={(text) => setPassword(text)}
                            validate={['required', (value: string | any[]) => value.length > 6]}
                            validationMessage={['Field is required', 'Password is too short']}
                            containerStyle={styles.passwordInput}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}
                            style={styles.showPasswordButton}
                        >
                            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.requirementText}>Minimum 6 characters, and at least one of the following: uppercase/lowercase letter, number, special character.</Text>
                    </View>
                    {/* </Card> */}


                    <Spacer height={16} />

                    <Button
                        label={'Sign in'}
                        size={Button.sizes.large}
                        disabled={loading}
                        onPress={() => signInWithEmail()}
                    />
                    <Button
                        label={'Sign up'}
                        size={Button.sizes.large}
                        disabled={loading}
                        onPress={() => signUpWithEmail()}
                        outline
                        style={{ backgroundColor: 'white', borderColor: '#CD385C' }}
                        labelStyle={{ color: '#CD385C' }}
                    />
                    <Text style={{ marginTop: 16, textAlign: 'right' }}>Forgot password?</Text>
                    <Spacer height={16} />
                    <View>
                        <Text style={styles.termsText}>By signing up, you agree to our <Text style={{ color: '#CD385C' }}>Terms of Service</Text> and <Text style={{ color: '#CD385C' }}>Privacy Policy</Text>.</Text>
                    </View>
                </View>
            </ThemedView>
        </SafeAreaView>
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
