import { Image, View, StyleSheet, Text, Pressable, StatusBar, ScrollView, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button, Chip, Fader } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { useFocusEffect } from '@react-navigation/native';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';



export default function Modal() {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [limit, setLimit] = useState<number | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noMoreData, setNoMoreData] = useState<boolean>(false);

    useEffect(() => {
        setLimit(0);
    }, []);

    useEffect(() => {
        fetchUsers();
    }, [limit]);


    const fetchUsers = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .range(limit, limit)

        if (data && data.length > 0) {
            setUsers(data);
            setImageUrl(supabase.storage.from('avatars').getPublicUrl(data[0].avatar_url).data.publicUrl);
        } else if (data && data.length === 0) {
            console.log("no more data")
            setNoMoreData(true)
        }
        setLoading(false)
    }

    const likeUser = () => {
        setLimit(limit + 1);
    }





    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <Button style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 3 }} />
                        <Text style={styles.buttonFilterText}>Search Filters <Text style={{ fontFamily: 'BodySemiBold' }}>(4)</Text></Text>
                    </Button>
                </View>

                {noMoreData ? (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Ionicons name="albums-outline" size={64} color={Colors.light.primary} />
                        <Text style={{ fontFamily: 'HeadingBold', fontSize: 24, color: Colors.light.text }}>You've reached the end</Text>
                        <Text style={{ fontFamily: 'BodyRegular', fontSize: 16, color: Colors.light.text, lineHeight: 22 }}>No more potential matches to show.</Text>
                        <Text style={{ fontFamily: 'BodyRegular', fontSize: 16, color: Colors.light.text, lineHeight: 22 }}>Try changing your search filter.</Text>
                        <Spacer height={64} />
                        <Link href="../">
                            <Text style={{ fontFamily: 'BodySemiBold', fontSize: 18, color: Colors.light.accent }}>Back to Home</Text>
                        </Link>
                    </View>
                ) : (
                    <>
                        <View style={styles.personContainer}>
                            {loading ? <ActivityIndicator size="large" color={Colors.light.primary} /> : <Image source={{ uri: imageUrl }} style={styles.person} />}
                            <Fader visible position={Fader.position.BOTTOM} tintColor={'#282828'} size={100} />
                            <View style={styles.personInfo}>
                                <Text style={styles.personName} numberOfLines={2} ellipsizeMode='tail' >{users.length > 0 ? users[0].name + " " : 'loading '}<Text style={styles.personAge}>{users.length > 0 ? 2024 - parseInt(users[0].age) : 0}</Text></Text>
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
                            <Pressable onPress={likeUser}>
                                <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                            </Pressable>
                            <Pressable onPress={() => { }}>
                                <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                            </Pressable>
                        </View>
                    </>
                )
                }
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