import { Image, StyleSheet, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';


export default function Inbox() {
    return (
        <SafeAreaView>
            <SignedOut>
                <ThemedView>
                    <ThemedText type="title">Please Log in</ThemedText>
                </ThemedView>
            </SignedOut>

            <SignedIn>
                <ThemedView>
                    <ThemedText type="title">Home</ThemedText>
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
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
