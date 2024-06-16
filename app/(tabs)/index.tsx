import { supabase } from '@/lib/supabase';
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
    const session = useAuth();
    const router = useRouter();
    let showOnboarding = useProfile(session);



    if (showOnboarding) {
        router.replace('/onboarding')
    }

    return (
        <View>
            <Text>Home Screen</Text>
            <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        </View>
    );
}