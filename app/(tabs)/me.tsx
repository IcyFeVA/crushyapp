import { Image, StyleSheet, Platform, Button, useColorScheme } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function Me() {
    const colorScheme = useColorScheme();

    return (
        <SafeAreaView>
            <ThemedView>
                <ThemedText type="title">My Crushy</ThemedText>
            </ThemedView>
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
