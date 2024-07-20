import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import { Chip, Fader } from 'react-native-ui-lib';
import TypewriterEffect from '@/components/CrushyTypewriterEffect';
import { useNavigation, StackActions } from '@react-navigation/native';
import { usePotentialMatches, useProfile } from '@/hooks/useApi';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface Interest {
    id: number;
    isShared: boolean;
}

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
    const { matches: potentialMatches, loading, error, fetchDiveMatches, recordAction } = usePotentialMatches();
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | number>(require('@/assets/images/react-logo.png'));
    const navigation = useNavigation();
    const typewriterKey = useRef(0);


    const [user, setUser] = useState<any[]>({ name: '', age: '0', interests: [] });
    const interestsList = useMemo(() => flattenArray(hobbiesInterests), []);
    const [hasSharedInterests, setHasSharedInterests] = useState<boolean>(false);
    const [myData, setMyData] = useState<any>({});

    useEffect(() => {
        if (session?.user?.id) {
            console.log('Potential Matches:', potentialMatches);
            fetchDiveMatches();
        }
    }, [session, fetchDiveMatches]);

    useEffect(() => {
        console.log('Current Match Index:', currentMatchIndex);
        const currentMatch = potentialMatches[currentMatchIndex];
        console.log('Current Match:', currentMatch);

        if (currentMatch?.avatar_pixelated_url) {
            console.log('Setting image URL:', currentMatch.avatar_pixelated_url);
            setImageUrl(currentMatch.avatar_pixelated_url);
        } else {
            console.log('No avatar URL, setting default image');
            setImageUrl(require('@/assets/images/react-logo.png'));
        }
    }, [currentMatchIndex, potentialMatches]);

    const currentMatch = potentialMatches[currentMatchIndex];

    const handleAction = useCallback(async (action: 'like' | 'dislike') => {
        console.log('HandleAction called');
        console.log('Session:', session);
        console.log('Current Match:', currentMatch);

        if (!session?.user?.id) {
            console.log('No session, returning early');
            return;
        }

        if (!currentMatch) {
            console.log('No currentMatch, returning early');
            return;
        }

        try {
            console.log(`Recording action for match: ${currentMatch.id}`);
            await recordAction(currentMatch.id, action);
            console.log('Action recorded successfully');

            if (action === 'like') {
                console.log('Checking for match');
                const isMatch = await checkForMatch(session.user.id, currentMatch.id);
                if (isMatch) {
                    console.log("It's a match!");
                    Alert.alert(
                        "It's a Match!",
                        `You and ${currentMatch.name} have liked each other!`,
                        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
                    );
                }
            }

            console.log('Moving to next match');
            moveToNextMatch();
        } catch (error) {
            console.error('Error in handleAction:', error);
        }
    }, [session, currentMatch, recordAction, checkForMatch, moveToNextMatch]);

    const moveToNextMatch = useCallback(() => {
        console.log('moveToNextMatch called');
        console.log(`Current index: ${currentMatchIndex}, Matches length: ${potentialMatches.length}`);
        if (currentMatchIndex < potentialMatches.length - 1) {
            console.log('Moving to next match in the list');
            setCurrentMatchIndex(prevIndex => {
                console.log(`New index: ${prevIndex + 1}`);
                return prevIndex + 1;
            });
        } else {
            console.log('Reached end of list, fetching new matches');
            fetchDiveMatches();
            setCurrentMatchIndex(0);
        }

        typewriterKey.current += 1;
    }, [currentMatchIndex, potentialMatches.length, fetchDiveMatches]);





    const handleLike = () => handleAction('like');
    const handleDislike = () => handleAction('dislike');



    const checkForMatch = async (currentUserId: string, likedUserId: string) => {
        // This function should be moved to the API layer in a future refactoring
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
    };












    useEffect(() => {
        const fetchMe = async () => {

            //setLoading(true)

            const { data } = await supabase
                .from('profiles_test')
                .select('*')
                .eq('id', session?.user.id);
            if (data) {
                setMyData(data[0])
                // setLoading(false)
            }
        }

        fetchMe();

    }, [session]);


    useEffect(() => {

        const fetchUser = async () => {

            // setLoading(true)

            const { data } = await supabase
                .from('profiles_test')
                .select('*')
                .eq('id', currentMatch.id)
            if (data) {
                console.log('User data:', data[0]);
                setUser(data[0]);
                // setLoading(false)
            }

        }

        if (currentMatch?.id && session?.user?.id) {
            fetchUser();
        }

    }, [currentMatch]);


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

    const renderInterestChips = (type: string) => {

        if (!user.interests || !myData.interests) return null;

        const sortedInterests = [...user.interests].sort(sortInterests);

        return sortedInterests.map((interest: string, index: number) => {

            const interestObject = interestsList.find(item => item.value === interest.toString());

            if (!interestObject) {
                console.error(`No label found for interest: ${interest}`);
                return null;
            }

            const isActive = myData.interests.includes(parseInt(interestObject.value));
            if (!hasSharedInterests && isActive) {
                setHasSharedInterests(true);
            }
            if (type === 'shared') {
                if (isActive) {
                    return (
                        <Chip
                            key={index}
                            label={interestObject.label}
                            labelStyle={[styles.chipLabel, styles.sharedChipLabel]}
                            containerStyle={[styles.chip, styles.sharedChip]}
                            iconSource={require('@/assets/images/icons/iconSharedInterest.png')}
                        />
                    );
                }
            } else {
                if (!isActive) {
                    return (
                        <Chip
                            key={index}
                            label={interestObject.label}
                            labelStyle={[styles.chipLabel]}
                            containerStyle={[styles.chip]}
                        />
                    );
                }
            }
        });
    };




    const bioText = `I\’m looking for a new partner, perhaps a partner for life. I never used a dating app before, but I heard good things about this one.

I\’m a great listener, and a fantastic cook. I love walking along the beach, and deep conversations.
\nTalking is important to me. I need to be able to talk about anything with you.

I also love dogs and cats, though I don’t have any pets at the moment. But please keep away snakes, spiders and any kind of insects! I\’m afraid I will get a heart attack with those.

Videogames is also something that is important to me. I play mostly online, to not feel alone all the time. I enjoy board games as well, and TCG\’s.

When it comes to music, I like most pop bands and dance music. My favorite are Christina Aguilera, Taylor Swift, and the Woodys.

Let me know what  you like and let’s get connected here on this cool platform!`







    if (error) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>`An error occurred. Please try again later. ${error}`</Text>
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

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.navigate('SearchFilters') }}>
                            <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                            <Text style={styles.buttonFilterText}>Search Filters</Text>
                        </Pressable>

                        <Pressable style={[styles.buttonFilter]} onPress={() => { navigation.goBack() }}>
                            <Image source={require('@/assets/images/icons/tab-home.png')} style={{ width: 32, aspectRatio: '1' }} />
                        </Pressable>
                    </View>
                </View>
            </View>



            <ScrollView style={styles.pageContent}>

                <View style={styles.personContainer}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            source={typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl}
                            style={styles.person}
                            onError={() => {
                                console.log('Error loading image, setting default');
                                setImageUrl(require('@/assets/images/react-logo.png'));
                            }}
                        />
                    </View>

                    <View style={{ marginTop: 16 }}>
                        <View style={styles.personInfo}>
                            <Text style={styles.personName}>{!loading ? `${currentMatch.name}, ${currentMatch.age}` : '...'}</Text>
                        </View>
                    </View>


                    {hasSharedInterests === true && (
                        <View style={{ paddingHorizontal: 16 }}>
                            <Spacer height={32} />

                            <Text style={{ fontFamily: 'HeadingBold', fontSize: 22, color: Colors.light.text, marginTop: 16 }}>Shared Hobbies & Interests</Text>
                            <View style={styles.chipsContainer}>
                                {renderInterestChips('shared')}
                            </View>
                        </View>
                    )}

                    <Spacer height={32} />

                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={{ fontFamily: 'HeadingBold', fontSize: 22, color: Colors.light.text, marginTop: 16 }}>Bio</Text>
                        <Spacer height={8} />
                        <Text style={{ fontFamily: 'BodyRegular', fontSize: 18, lineHeight: 26 }}>{bioText}</Text>
                    </View>

                    <Spacer height={32} />

                    <View style={{ paddingHorizontal: 16 }}>
                        <Text style={{ fontFamily: 'HeadingBold', fontSize: 22, color: Colors.light.text, marginTop: 16 }}>Other Hobbies & Interests</Text>
                        <View style={styles.chipsContainer}>
                            {renderInterestChips('')}
                        </View>
                    </View>
                </View>

                <View style={styles.buttonsMatching}>
                    <Pressable onPress={handleDislike} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={handleLike} disabled={loading}>
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

});
