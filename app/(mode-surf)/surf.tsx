import { Image, View, StyleSheet, Text, Pressable, StatusBar, ScrollView, ActivityIndicator, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, useNavigation } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button, Card, Chip, Fader, ListItem } from 'react-native-ui-lib';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import TypewriterEffect from '@/components/TypewriterEffect';
import { MMKV, useMMKVString } from 'react-native-mmkv'
import hobbiesInterests from '@/constants/Interests'
import { useAuth } from '@/hooks/useAuth';
import BottomSheet, {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    useBottomSheet,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import SurfButtomSheet from '@/components/SurfButtomSheet';




export default function Surf() {
    const session = useAuth();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [limit, setLimit] = useState<number | null>(0);
    const [user, setUser] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noMoreData, setNoMoreData] = useState<boolean>(false);
    const [interestsList, setInterestsList] = useState<string[]>([]);
    const [myData, setMyData] = useState<any[]>([]);
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);
    // const [interests, setInterests] = useMMKVString('app.interests')
    // let interestsObject: string[] = []


    useEffect(() => {
        // interestsObject = JSON.parse(interests)
        // console.log(interestsObject)
        const fetchMe = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session?.user.id);
            if (data) setMyData(data[0])
        }

        fetchMe();
    }, [session]);

    useEffect(() => {
        setInterestsList(flattenArray(hobbiesInterests))
        fetchNextUser();
    }, [limit]);

    const fetchNextUser = async () => {
        setLoading(true)
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .range(limit, limit)

        if (data && data.length > 0) {
            if (data[0].id === session?.user.id) {
                console.log('Skipping self')
                setLimit(limit + 1)
                return;
            }
            setUser(data);
            setImageUrl(supabase.storage.from('avatars').getPublicUrl(data[0].avatar_url).data.publicUrl);
        } else if (data && data.length === 0) {
            setNoMoreData(true)
        }
        setLoading(false)
    }

    const likeUser = () => {
        setLimit(limit + 1);
    }

    const dislikeUser = () => {
        setLimit(limit + 1);
    }


    function flattenArray(arr) {
        return arr.flat();
    }
    function findObjectByValue(arr, targetValue) {
        return arr.find(item => item.value === targetValue);
    }







    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>

            <View style={styles.innerContainer}>

                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <Button style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { setBottomSheetOpen(true) }}>
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
                            {user.length > 0 && (
                                <Image source={{ uri: imageUrl }} style={styles.person} />
                            )}

                            {loading && <ActivityIndicator size="large" color={Colors.light.primary} style={{ position: 'absolute', top: 32, left: 32 }} />}

                            <Fader visible position={Fader.position.BOTTOM} tintColor={'#282828'} size={100} />
                            <View style={styles.personInfo}>
                                {!loading && <TypewriterEffect styling={styles.personName} text={user.length > 0 ? user[0].name + " " : ' '} speed={10} />}
                                {!loading && <TypewriterEffect styling={styles.personAge} text={user.length > 0 ? (2024 - parseInt(user[0].age)).toString() : ''} speed={150} />}
                            </View>
                            <ScrollView horizontal style={styles.chipsContainer} showsHorizontalScrollIndicator={false}>
                                {user.length > 0 && myData.interests && (() => {
                                    // Sort function (to make matching interests appear first)
                                    const sortInterests = (a, b) => {
                                        const aObject = findObjectByValue(interestsList, a.toString());
                                        const bObject = findObjectByValue(interestsList, b.toString());

                                        const aIncluded = myData.interests.includes(parseInt(aObject?.value));
                                        const bIncluded = myData.interests.includes(parseInt(bObject?.value));

                                        if (aIncluded && !bIncluded) return -1;
                                        if (!aIncluded && bIncluded) return 1;
                                        return 0;
                                    };

                                    // Sort the interests array
                                    const sortedInterests = [...user[0].interests].sort(sortInterests);

                                    return sortedInterests.map((interest: string, index: number) => {
                                        if (interestsList.length === 0) return (<Text key={index}>No interests found</Text>);

                                        const interestObject = findObjectByValue(interestsList, interest.toString());

                                        // this should never happen, but if it does, we know something's wrong 
                                        if (!interestObject) {
                                            console.error(`No label found for interest: ${interest}`);
                                            return (
                                                <Chip
                                                    key={index}
                                                    label="Unknown"
                                                    labelStyle={styles.chipLabel}
                                                    containerStyle={[styles.chip, { backgroundColor: Colors.light.white }]}
                                                />
                                            );
                                        }

                                        if (myData.interests.includes(parseInt(interestObject.value))) {
                                            return (
                                                <Chip
                                                    key={index}
                                                    label={interestObject.label}
                                                    labelStyle={[styles.chipLabel, styles.chipActiveLabel]}
                                                    style={[styles.chip, styles.chipActive, { flex: 1 }, index === sortedInterests.length - 1 ? { marginRight: 32 } : {}]}
                                                />
                                            )
                                        } else {
                                            return (
                                                <Chip
                                                    key={index}
                                                    label={interestObject.label}
                                                    labelStyle={styles.chipLabel}
                                                    style={[styles.chip, index === sortedInterests.length - 1 ? { marginRight: 32 } : {}]}
                                                />
                                            )
                                        }
                                    });
                                })()}
                            </ScrollView>
                            {!bottomSheetOpen && (
                                <Pressable onPress={() => router.push('../')} style={[styles.buttonClose, defaultStyles.buttonShadow]}  >
                                    <Ionicons name="close" size={24} color={Colors.light.accent} />
                                </Pressable>
                            )}
                            <Pressable onPress={() => { router.push(`/detail/${user[0].id}?imageUrl=${imageUrl}`) }} style={[styles.buttonExpand, defaultStyles.buttonShadow]} >
                                <Ionicons name="chevron-down" size={24} color={Colors.light.accent} />
                            </Pressable>
                        </View>
                        <View style={styles.buttonsMatching}>
                            <Pressable onPress={dislikeUser}>
                                <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                            </Pressable>
                            <Pressable onPress={likeUser}>
                                <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                            </Pressable>
                            <Pressable onPress={() => { alert("This feature will be available in the future.") }}>
                                <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                            </Pressable>
                        </View>

                        {bottomSheetOpen ? <SurfButtomSheet closeAction={setBottomSheetOpen} /> : null}

                    </>
                )}
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
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
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

