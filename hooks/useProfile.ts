// src/hooks/useProfile.ts
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Alert } from 'react-native';
import { Session } from '@supabase/supabase-js';

export const useProfile = (session: Session | null) => {
    const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

    useEffect(() => {
        if (session) {
            const getProfile = async () => {
                try {
                    const { data } = await supabase
                        .from('profiles_test')
                        .select('name, avatar_url')
                        .eq('id', session?.user.id)
                        .single();

                    setShowOnboarding(data?.name === null);
                } catch (error: any) {
                    Alert.alert(error.message);
                }
            };

            getProfile();
        }
    }, [session]);

    return showOnboarding;
};
