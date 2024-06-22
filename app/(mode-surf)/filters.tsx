import React from 'react';
import { View, Text } from 'react-native';
import { Link, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Filters() {
    const isPresented = router.canGoBack();
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    {!isPresented && <Link href="../">Dismiss</Link>}
                    <Text>Search Filters</Text>
                </View>
            </SafeAreaView>
        </View>
    );
}
