import { Image, StyleSheet, Platform, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Textfield } from '@/components/ui/Textfields';
import { Pageview } from '@/components/ui/Containers';


export default function Onboarding({ session }: { session: Session }) {
    return (
        <SafeAreaView>
            <Pageview>
                <Textfield
                    label={'E-Mail'}
                    onChangeText={(text) => { }}
                    validate={['required', 'email', (value: string | any[]) => value.length > 2]}
                    validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
                    enableErrors
                />
                <Button title={'Sign out'} onPress={() => { supabase.auth.signOut() }} />
            </Pageview>
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
