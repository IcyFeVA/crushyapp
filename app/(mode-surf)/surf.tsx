import { Image, View, StyleSheet, Text, Pressable, StatusBar, ScrollView, ActivityIndicator, Platform, Alert, Touchable } from 'react-native';
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
import { getBackgroundColor } from 'react-native-ui-lib/src/helpers/AvatarHelper';
import { TouchableOpacity } from 'react-native-gesture-handler';




export default function Surf() {
    const session = useAuth();
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [limit, setLimit] = useState<number | null>(0);
    const [user, setUser] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [noMoreData, setNoMoreData] = useState<boolean>(false);
    const [myData, setMyData] = useState<any>({});
    const [bottomSheetOpen, setBottomSheetOpen] = useState<boolean>(false);

    const interestsList = useMemo(() => flattenArray(hobbiesInterests), []);

    useEffect(() => {
        const fetchMe = async () => {
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session?.user.id)
                .single();
            if (data) setMyData(data);
        }

        fetchMe();
    }, [session]);

    useEffect(() => {
        fetchNextUser();
    }, [limit]);

    const fetchNextUser = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .range(limit, limit);

        if (data && data.length > 0) {
            if (data[0].id === session?.user.id) {
                console.log('Skipping self');
                setLimit(prev => prev + 1);
                setLoading(false);
                return;
            }
            setUser(data);
            setImageUrl(supabase.storage.from('avatars').getPublicUrl(data[0].avatar_url).data.publicUrl);
        } else if (data && data.length === 0) {
            setNoMoreData(true);
        }
        setLoading(false);
    }

    const likeUser = () => setLimit(prev => prev + 1);
    const dislikeUser = () => setLimit(prev => prev + 1);

    function flattenArray(arr: any[]): any[] {
        return arr.flat();
    }

    const sortInterests = (a: string, b: string) => {
        const aIncluded = myData.interests?.includes(parseInt(a));
        const bIncluded = myData.interests?.includes(parseInt(b));
        if (aIncluded && !bIncluded) return -1;
        if (!aIncluded && bIncluded) return 1;
        return 0;
    };

    const renderInterestChips = () => {
        if (!user.length || !myData.interests) return null;

        const sortedInterests = [...user[0].interests].sort(sortInterests);

        return sortedInterests.map((interest: string, index: number) => {
            const interestObject = interestsList.find(item => item.value === interest.toString());

            if (!interestObject) {
                console.error(`No label found for interest: ${interest}`);
                return null;
            }

            const isActive = myData.interests.includes(parseInt(interestObject.value));
            const isLast = index === sortedInterests.length - 1;

            return (
                <Chip
                    key={interest}
                    label={interestObject.label}
                    labelStyle={[styles.chipLabel, isActive && styles.chipActiveLabel]}
                    containerStyle={[
                        styles.chip,
                        isActive && styles.chipActive,
                        isLast && { marginRight: 32 }
                    ]}
                />
            );
        });
    };







    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.light.background }}>

            <View style={styles.innerContainer}>

                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <Button style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { router.push('searchFilters') }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} />
                        <Text style={styles.buttonFilterText}>Search Filters</Text>
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

                            <Pressable onPress={() => { router.push(`/detail/${user[0].id}?imageUrl=${imageUrl}`) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
                                < View style={{ width: '100%', height: '66%' }} >
                                </View>
                            </Pressable>

                            {loading && <ActivityIndicator size="large" color={Colors.light.primary} style={{ position: 'absolute', top: 32, left: 32, zIndex: 5 }} />}

                            <Fader visible position={Fader.position.BOTTOM} tintColor={'#282828'} size={100} />
                            <View style={styles.personInfo}>
                                {!loading && <TypewriterEffect styling={styles.personName} text={user.length > 0 ? user[0].name + " " : ' '} speed={10} />}
                                {!loading && <TypewriterEffect styling={styles.personAge} text={user.length > 0 ? (2024 - parseInt(user[0].age)).toString() : ''} speed={150} />}
                            </View>
                            <ScrollView horizontal style={styles.chipsContainer} showsHorizontalScrollIndicator={false}>
                                {renderInterestChips()}
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
                    </>
                )
                }
            </View >
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
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 32,
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
        marginBottom: 16,
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

