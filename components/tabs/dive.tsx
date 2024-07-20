import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import { Chip } from 'react-native-ui-lib';
import { useNavigation, StackActions } from '@react-navigation/native';
import { usePotentialMatches, useProfile } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface PotentialMatch {
    id: string;
    name: string;
    age: number;
    gender: number;
    avatar_pixelated_url: string;
    interests: number[];
}

export default function Dive() {
    const session = useAuth();
    const navigation = useNavigation();
    const { matches: potentialMatches, loading, error, fetchDiveMatches, recordAction } = usePotentialMatches();
    const { profileDetails, fetchProfileDetails } = useProfile();
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | number>(require('@/assets/images/react-logo.png'));
    const scrollViewRef = useRef<ScrollView>(null);
    const [user, setUser] = useState({ name: '', age: '0', interests: [] });
    const [myData, setMyData] = useState({});

    const currentMatch = potentialMatches[currentMatchIndex];

    const interestsList = useMemo(() => hobbiesInterests.flat(), []);

    useEffect(() => {
        if (session?.user?.id) {
            fetchDiveMatches();
            fetchMyData();
        }
    }, [session, fetchDiveMatches]);

    useEffect(() => {
        if (currentMatch?.avatar_pixelated_url) {
            setImageUrl(currentMatch.avatar_pixelated_url);
        } else {
            setImageUrl(require('@/assets/images/react-logo.png'));
        }
    }, [currentMatch]);

    useEffect(() => {
        if (currentMatch?.id && session?.user?.id) {
            fetchUser();
            fetchProfileDetails(currentMatch.id);
        }
    }, [currentMatch, session]);

    const fetchMyData = useCallback(async () => {
        const { data } = await supabase
            .from('profiles_test')
            .select('*')
            .eq('id', session?.user.id);
        if (data) {
            setMyData(data[0]);
        }
    }, [session]);

    const fetchUser = useCallback(async () => {
        const { data } = await supabase
            .from('profiles_test')
            .select('*')
            .eq('id', currentMatch.id);
        if (data) {
            setUser(data[0]);
        }
    }, [currentMatch]);

    const handleAction = useCallback(async (action: 'like' | 'dislike') => {
        if (!session?.user?.id || !currentMatch) return;

        scrollToTop();

        try {
            await recordAction(currentMatch.id, action);

            if (action === 'like') {
                const isMatch = await checkForMatch(session.user.id, currentMatch.id);
                if (isMatch) {
                    Alert.alert(
                        "It's a Match!",
                        `You and ${currentMatch.name} have liked each other!`,
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                }
            }

            moveToNextMatch();
        } catch (error) {
            console.error('Error in handleAction:', error);
        }
    }, [session, currentMatch, recordAction, checkForMatch, moveToNextMatch]);

    const moveToNextMatch = useCallback(() => {
        if (currentMatchIndex < potentialMatches.length - 1) {
            setCurrentMatchIndex(prevIndex => prevIndex + 1);
        } else {
            fetchDiveMatches();
            setCurrentMatchIndex(0);
        }
    }, [currentMatchIndex, potentialMatches.length, fetchDiveMatches]);

    const checkForMatch = useCallback(async (currentUserId: string, likedUserId: string) => {
        const { data, error } = await supabase
            .from('matches')
            .select('*')
            .eq('user1_id', likedUserId)
            .eq('user2_id', currentUserId)
            .eq('user1_action', 1);

        if (error && error.code !== 'PGRST116') {
            console.error('Error checking for match:', error);
            return false;
        }

        return data && data.length > 0;
    }, []);

    const renderInterestChips = useCallback((type: string) => {
        if (!user.interests || !myData.interests) return null;

        const sortedInterests = [...user.interests].sort((a: number, b: number) => {
            const aIncluded = myData.interests?.includes(a);
            const bIncluded = myData.interests?.includes(b);
            if (aIncluded && !bIncluded) return -1;
            if (!aIncluded && bIncluded) return 1;
            return 0;
        });

        return sortedInterests.map((interest: number, index: number) => {
            const interestObject = interestsList.find(item => item.value === interest.toString());
            if (!interestObject) return null;

            const isActive = myData.interests.includes(interest);
            if (type === 'shared' && isActive) {
                return (
                    <Chip
                        key={index}
                        label={interestObject.label}
                        labelStyle={[styles.chipLabel, styles.sharedChipLabel]}
                        containerStyle={[styles.chip, styles.sharedChip]}
                        iconSource={require('@/assets/images/icons/iconSharedInterest.png')}
                    />
                );
            } else if (type !== 'shared' && !isActive) {
                return (
                    <Chip
                        key={index}
                        label={interestObject.label}
                        labelStyle={[styles.chipLabel]}
                        containerStyle={[styles.chip]}
                    />
                );
            }
            return null;
        });
    }, [user.interests, myData.interests, interestsList]);

    const unescapeText = useCallback((text: string) => {
        return text
            .replace(/\\'/g, "'")
            .replace(/\\n/g, '\n')
            .replace(/\\\\/g, '\\');
    }, []);

    const scrollToTop = useCallback(() => {
        scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }, []);

    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>An error occurred. Please try again later. {error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!currentMatch) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.noMatchesContainer}>
                    <Ionicons name="albums-outline" size={64} color={Colors.light.primary} />
                    <Text style={styles.noMatchesTitle}>You've reached the end</Text>
                    <Text style={styles.noMatchesText}>No more potential matches to show.</Text>
                    <Text style={styles.noMatchesText}>Adjust search filters, or check back later.</Text>
                    <Spacer height={40} />
                    <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                        <Text style={styles.buttonFilterText}>Search Filters</Text>
                    </Pressable>
                    <Spacer height={40} />
                    <Pressable onPress={() => { navigation.dispatch(StackActions.popToTop()) }}>
                        <Text style={styles.refreshText}>Back Home</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <ActivityIndicator size="small" color={Colors.light.accent} style={styles.loader} />}

            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                            <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                            <Text style={styles.buttonFilterText}>Search Filters</Text>
                        </Pressable>
                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.goBack() }}>
                            <Image source={require('@/assets/images/icons/tab-home.png')} style={{ width: 32, aspectRatio: 1 }} />
                        </Pressable>
                    </View>
                </View>
            </View>

            <ScrollView ref={scrollViewRef} style={styles.pageContent}>
                <View style={styles.personContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                            style={styles.person}
                            onError={() => setImageUrl(require('@/assets/images/react-logo.png'))}
                        />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <View style={styles.personInfo}>
                            <Text style={styles.personName}>{!loading ? `${currentMatch.name}, ${currentMatch.age}` : '...'}</Text>
                        </View>
                    </View>

                    {renderInterestChips('shared')?.some(Boolean) && (
                        <View style={{ paddingHorizontal: 16 }}>
                            <Spacer height={32} />
                            <Text style={styles.sectionTitle}>Shared Hobbies & Interests</Text>
                            <View style={styles.chipsContainer}>
                                {renderInterestChips('shared')}
                            </View>
                        </View>
                    )}

                    <Spacer height={32} />

                    {profileDetails?.bio && (
                        <View>
                            <View style={{ paddingHorizontal: 16 }}>
                                <Text style={styles.sectionTitle}>Bio</Text>
                                <Spacer height={8} />
                                <Text style={styles.bioText}>{unescapeText(profileDetails.bio)}</Text>
                            </View>
                            <Spacer height={32} />
                        </View>
                    )}


                    {renderInterestChips('')?.some(Boolean) && (
                        <View style={{ paddingHorizontal: 16 }}>
                            <Text style={styles.sectionTitle}>Other Hobbies & Interests</Text>
                            <View style={styles.chipsContainer}>
                                {renderInterestChips('')}
                            </View>
                        </View>
                    )}
                </View>

                <View style={styles.buttonsMatching}>
                    <Pressable onPress={() => handleAction('dislike')} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={() => handleAction('like')} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                    </Pressable>
                    <Pressable onPress={() => { alert("This feature will be available in the future.") }} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        paddingTop: 16,
        paddingHorizontal: 16,
    },
    pageContent: {

    },
    header: {
        width: '100%',
        marginTop: 16,
        marginBottom: 0,
        paddingBottom: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.light.tertiary,
    },
    logo: {
        width: 96,
        resizeMode: 'contain'
    },
    buttonFilter: {
        backgroundColor: Colors.light.white,
        paddingBottom: 2,
        paddingHorizontal: 12,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
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
    personContainer: {
        // flex: 1,
        marginTop: 32,
    },
    person: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 80,
        backgroundColor: Colors.light.tertiary,
    },
    loader: {
        position: 'absolute',
        top: 8,
        left: 16,
        zIndex: 5,
    },
    personInfo: {
        flexDirection: 'row',
        justifyContent: 'center',
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
    chipsContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16,
        rowGap: 8,
    },
    chip: {
        backgroundColor: Colors.light.white,
        paddingVertical: 8,
        paddingHorizontal: 4,
        marginRight: 8,
        borderRadius: 99,
        shadowColor: Colors.light.black,
    },
    sharedChip: {
        paddingLeft: 12,
        backgroundColor: Colors.light.white,
    },
    sharedChipLabel: {
        color: Colors.light.text,
    },
    chipLabel: {
        color: Colors.light.text,
        fontSize: 13,
        fontFamily: 'BodyRegular',
    },
    buttonsMatching: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
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
    noMatchesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noMatchesTitle: {
        fontFamily: 'HeadingBold',
        fontSize: 24,
        color: Colors.light.text,
        marginTop: 16,
    },
    noMatchesText: {
        fontFamily: 'BodyRegular',
        fontSize: 16,
        color: Colors.light.text,
        lineHeight: 22,
    },
    refreshText: {
        fontFamily: 'BodySemiBold',
        fontSize: 18,
        color: Colors.light.accent,
    },
    sectionTitle: {
        fontFamily: 'HeadingBold',
        fontSize: 22,
        color: Colors.light.text,
        marginTop: 16,
    },
    bioText: {
        fontFamily: 'BodyRegular',
        fontSize: 18,
        lineHeight: 26,
    },
});
