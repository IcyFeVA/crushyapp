import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '@/lib/supabase';

export default function DetailsScreen() {
    const { id, imageUrl } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useState<any[]>([]);

    useEffect(() => {
        fetchUser();
    }, [])

    const fetchUser = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)

        if (data[0] && data.length > 0) {
            console.log("🚀 ~ fetchUser ~ data:", data)
            setUser(data[0]);
        }

        setLoading(false)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <ScrollView style={styles.innerContainer}>
                {loading && <ActivityIndicator size="large" color={Colors.light.accent} style={{ position: 'absolute', top: 32, left: 32, zIndex: 2 }} />}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.image} />
                    <Pressable onPress={() => { router.dismiss(1) }} style={[styles.buttonCollapse, defaultStyles.buttonShadow]} >
                        <Ionicons name="chevron-up" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={{ padding: 16 }}>
                    <View style={styles.personInfo}>
                        <Text style={styles.personName}>{user.name}<Text style={styles.personAge}>, {(2024 - parseInt(user.age)).toString()}</Text></Text>
                    </View>
                    <Text style={{ fontFamily: 'HeadingBold', fontSize: 24, color: Colors.light.text, marginTop: 16 }}>Bio</Text>
                    <Text style={{ fontFamily: 'BodyRegular', fontSize: 16, lineHeight: 26 }}>I’m looking for a new partner, perhaps a partner for life. I never used a dating app before, but I heard good things about this one.

                        I’m a great listener, and a fantastic cook. I love walking along the beach, and deep conversations.
                        Talking is important to me. I need to be able to talk about anything with you.

                        I also love dogs and cats, though I don’t have any pets at the moment. But please keep away snakes, spiders and any kind of insects! I’m afraid I will get a heart attack with those.

                        Videogames is also something that is important to me. I play mostly online, to not feel alone all the time. I enjoy board games as well, and TCG’s.

                        When it comes to music, I like most pop bands and dance music. My favorite are Christina Aguilera, Taylor Swift, and the Woodys.

                        Let me know what  you like and let’s get connected here on this cool platform!</Text>
                </View>

            </ScrollView>
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
    imageContainer: {
        width: '100%',
        aspectRatio: 3 / 4,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        backgroundColor: Colors.light.backgroundSecondary,
    },
    personInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
    },
    personName: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.text,
    },
    personAge: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.text,
        opacity: 0.7
    },
    buttonCollapse: {
        backgroundColor: Colors.light.white,
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        borderRadius: 99,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.black,
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    chipsContainer: {
        flex: 1,
        position: 'absolute',
        bottom: 16,
        paddingHorizontal: 16,
    },
    chip: {
        backgroundColor: Colors.light.white,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginRight: 8,
        borderRadius: 99,
        shadowColor: Colors.light.black,
    },
    chipActive: {
        backgroundColor: Colors.light.accent,
    },
    chipLabel: {
        color: Colors.light.text,
        fontSize: 13,
        fontFamily: 'BodyRegular',
    },
    chipActiveLabel: {
        color: Colors.light.textInverted,
    },
    scrollContainer: {
        marginLeft: 16,
    },
});