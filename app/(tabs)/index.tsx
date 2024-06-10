import { supabase } from '@/lib/supabase';
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Home() {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
    );
}