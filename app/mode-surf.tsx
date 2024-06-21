import { Image, View, StyleSheet, Text, Pressable, StatusBar, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button, Chip, Fader } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';



export default function Modal() {
    const session = useAuth();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [userObj, setUserObj] = useState<any>(null);

    const getData = async (table: string, fields: string, setFunction: any): Promise<any> => {
        let { data, error } = await supabase
            .from(table)
            .select(fields)
            .eq('id', session?.user.id);

        if (data && data.length > 0) {
            setFunction(data[0]);
            return data[0]
        }
        return null;
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('gender_preference', 2)
            .range(0, 1)

        if (data) {
            for (let i = 0; i < data.length; i++) {
                console.log(data[i].name, data[i].age, data[i].avatar_url)
            }
        }
    }

    useFocusEffect(
        useCallback(() => {
            if (session) {
                const fetchImage = async () => {
                    const data = await getData('profiles', '*', setUserObj);
                    if (data && data.avatar_url) {
                        setImageUrl(supabase.storage.from('avatars').getPublicUrl(data.avatar_url).data.publicUrl);
                    }
                };

                fetchImage();
            }
        }, [session])
    );


    return ( //<Link href="../">Dismiss</Link>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <Button style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 3 }} />
                        <Text style={styles.buttonFilterText}>Search Filters <Text style={{ fontFamily: 'BodySemiBold' }}>(4)</Text></Text>
                    </Button>
                </View>
                <View style={styles.personContainer}>
                    {imageUrl ? <Image source={{ uri: imageUrl }} style={styles.person} /> : <ActivityIndicator size="large" color={Colors.light.accent} />}
                    <Fader visible position={Fader.position.BOTTOM} tintColor={'#282828'} size={100} />
                    <View style={styles.personInfo}>
                        <Text style={styles.personName} numberOfLines={2} ellipsizeMode='tail' >{userObj?.name && userObj.name}</Text>
                        <Text style={styles.personAge}>{userObj?.age && 2024 - parseInt(userObj.age)}</Text>
                    </View>
                    <ScrollView horizontal style={styles.chipsContainer} contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false}>
                        <Chip style={[styles.chip, styles.chipActive]} label="Burgers" labelStyle={[styles.chipLabel, styles.chipActiveLabel]} />
                        <Chip style={[styles.chip, styles.chipActive]} label="Basketball" labelStyle={[styles.chipLabel, styles.chipActiveLabel]} />
                        <Chip style={styles.chip} label="Tennis" labelStyle={styles.chipLabel} />
                        <Chip style={styles.chip} label="Videogames" labelStyle={styles.chipLabel} />
                        <Chip style={styles.chip} label="Movies" labelStyle={styles.chipLabel} />
                        <Chip style={styles.chip} label="Dancing" labelStyle={styles.chipLabel} />
                        <Chip style={styles.chip} label="Diving" labelStyle={styles.chipLabel} />
                        <Chip style={styles.chip} label="Skiing" labelStyle={styles.chipLabel} />
                        <Chip style={styles.chip} label="Hiking" labelStyle={styles.chipLabel} />
                    </ScrollView>
                    <Pressable onPress={() => router.push('../')} style={[styles.buttonClose, defaultStyles.buttonShadow]}  >
                        <Ionicons name="close" size={24} color={Colors.light.accent} />
                    </Pressable>
                    <Pressable onPress={() => { }} style={[styles.buttonExpand, defaultStyles.buttonShadow]} >
                        <Ionicons name="chevron-down" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={styles.buttonsMatching}>
                    <Pressable onPress={() => { }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    personContainer: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
        width: '100%',
        height: '100%',
    },
    person: {
        flex: 1,
        backgroundColor: Colors.light.tertiary,
    },
    personInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        position: 'absolute',
        bottom: 56,
        left: 16,
        width: '78%',
    },
    personName: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.white,
    },
    personAge: {
        fontFamily: 'HeadingBold',
        fontSize: 32,
        color: Colors.light.white,
        opacity: 0.7
    },
    container: {
        flex: 1,
        // paddingTop: StatusBar.currentHeight + 24,
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        // justifyContent: 'space-between',
        // alignItems: 'center',
    },
    header: {
        width: '100%',
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        width: 96,
        resizeMode: 'contain'
    },
    buttonFilter: {
        backgroundColor: Colors.light.white,
        paddingVertical: 2,
        paddingHorizontal: 12,
        paddingBottom: 6,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
    },
    buttonFilterText: {
        fontSize: 14,
        fontFamily: 'BodyRegular',
        color: Colors.light.text,
    },
    buttonsMatching: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    buttonsMatchingPrimary: {
        maxWidth: 90,
        maxHeight: 90,
    },
    buttonsMatchingSecondary: {
        maxWidth: 80,
        maxHeight: 80,
        marginHorizontal: 16,
    },
    buttonClose: {
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
        top: 16,
        right: 16,
    },
    buttonExpand: {
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
        bottom: 64,
        right: 16,
    },
    chipsContainer: {
        position: 'absolute',
        bottom: 16,
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