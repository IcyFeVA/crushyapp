import { Image, StyleSheet, Platform, Button, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';

export default function Me() {
    const { isSignedIn, signOut } = useAuth();
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView>
            <SignedOut>
                <ThemedView>
                    {!isSignedIn && <Link href="/login">Login</Link>}
                </ThemedView>
            </SignedOut>

            <SignedIn>
                <ThemedView>
                    <ThemedText type="title">My Crushy</ThemedText>
                    {isSignedIn && <Button title="Logout" onPress={() => signOut()} />}
                </ThemedView>
            </SignedIn>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
});
