import { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import { Chip, Fader } from 'react-native-ui-lib';
import { router } from 'expo-router';
import TypewriterEffect from '@/components/CrushyTypewriterEffect';
import { useNavigation, StackActions } from '@react-navigation/native';

interface Interest {
    id: number;
    isShared: boolean;
}

interface PotentialMatch {
    id: string;
    name: string;
    age: number;
    gender: number;
    avatar_url: string;
    interests: Interest[];
}

export default function Surf() {
    const [potentialMatches, setPotentialMatches] = useState<PotentialMatch[]>([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [userInterests, setUserInterests] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const session = useAuth();
    const navigation = useNavigation();


    const fetchUserAndPotentialMatches = useCallback(async () => {
        if (!session?.user.id) return;
        console.log('fetchUserAndPotentialMatches');
        setLoading(true);

        // Fetch user interests
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('interests')
            .eq('id', session.user.id)
            .single();

        if (userError) {
            console.error('Error fetching user interests:', userError);
            return;
        }

        setUserInterests(userData.interests);

        // Fetch potential matches
        const { data, error } = await supabase.rpc('get_potential_matches', {
            user_id: session.user.id,
            limit_count: 10,
        });

        if (error) {
            console.error('Error fetching potential matches:', error);
            return;
        }

        // Process matches to include shared interest information
        const processedMatches = data.map((match: PotentialMatch) => ({
            ...match,
            interests: match.interests.map(interest => ({
                id: interest,
                isShared: userData.interests.includes(interest)
            }))
        }));

        setPotentialMatches(processedMatches);

        if (processedMatches.length > 0) {
            if (processedMatches[0].avatar_url) {
                setImageUrl(processedMatches[0].avatar_url);
                // setImageUrl(supabase.storage.from('avatars').getPublicUrl(processedMatches[0].avatar_url).data.publicUrl);
            }
        }


        setLoading(false);
    }, [session?.user.id]);

    useEffect(() => {
        fetchUserAndPotentialMatches();
    }, [fetchUserAndPotentialMatches]);




    const handleAction = async (action: 'like' | 'dislike') => {
        if (!session?.user.id || !currentMatch) return;



        // Record the action in the matches table
        const { error } = await supabase
            .from('matches')
            .insert({
                user1_id: session.user.id,
                user2_id: currentMatch.id,
                user1_action: action === 'like' ? 1 : 0, // 1 for like, 0 for dislike
            });

        if (error) {
            console.error(`Error recording ${action} action:`, error);
        } else {
            console.log(`${action} action recorded successfully`);
        }

        moveToNextMatch();


    };






    const checkForMatch = async (currentUserId: string, likedUserId: string) => {
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

    const handleLike = async () => {
        if (!session?.user.id || !currentMatch) return;

        setLoading(true);

        await handleAction('like');

        const isMatch = await checkForMatch(session.user.id, currentMatch.id);
        if (isMatch) {
            // It's a match!
            console.log("It's a match!");
            // TODO: Implement match notification or navigation to chat
            // For now, let's show an alert
            Alert.alert(
                "It's a Match!",
                `You and ${currentMatch.name} have liked each other!`,
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }

        moveToNextMatch();

        setLoading(false);
    };


    const handleDislike = () => handleAction('dislike');



    const moveToNextMatch = () => {

        if (currentMatchIndex < potentialMatches.length - 1) {
            setCurrentMatchIndex(currentMatchIndex + 1);
            setImageUrl(potentialMatches[currentMatchIndex + 1].avatar_url);
            console.log(potentialMatches[currentMatchIndex + 1].avatar_url)
            // setImageUrl(supabase.storage.from('avatars').getPublicUrl(potentialMatches[currentMatchIndex + 1].avatar_url).data.publicUrl);
        } else {
            fetchUserAndPotentialMatches();
            setCurrentMatchIndex(0);
        }

    };




    const renderInterestChips = () => {
        if (!currentMatch) return null;

        // Sort interests: shared interests first, then non-shared
        const sortedInterests = [...currentMatch.interests].sort((a, b) => {
            if (a.isShared && !b.isShared) return -1;
            if (!a.isShared && b.isShared) return 1;
            return 0;
        });

        return sortedInterests.map((interest, index) => {
            const interestObject = hobbiesInterests.flat().find(item => item.value === interest.id.toString());

            if (!interestObject) {
                console.error(`No label found for interest: ${interest.id}`);
                return null;
            }
            const isLast = index === sortedInterests.length - 1;

            if (!interest.isShared) {
                return (
                    <Chip
                        key={interest.id}
                        label={interestObject.label}
                        labelStyle={[styles.chipLabel]}
                        containerStyle={[styles.chip, isLast && { marginRight: 32 }]}
                    />
                );
            } else {
                return (
                    <Chip
                        key={interest.id}
                        label={interestObject.label}
                        labelStyle={[styles.chipLabel, styles.sharedChipLabel]}
                        containerStyle={[styles.chip, styles.sharedChip, isLast && { marginRight: 32 }]}
                        iconSource={require('@/assets/images/icons/iconSharedInterest.png')}
                    />
                );
            }
        });
    };



    const currentMatch = potentialMatches[currentMatchIndex];

    if (!currentMatch) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.noMatchesContainer}>
                    <Ionicons name="albums-outline" size={64} color={Colors.light.primary} />
                    <Text style={styles.noMatchesTitle}>You've reached the end</Text>
                    <Text style={styles.noMatchesText}>No more potential matches to show.</Text>
                    <Text style={styles.noMatchesText}>Check back later, or change the filters.</Text>
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
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />

                    <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                        <Pressable style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { navigation.navigate('searchFilters') }}>
                            <Ionicons name="search" size={12} color={Colors.light.text} style={{ marginTop: 2 }} />
                            <Text style={styles.buttonFilterText}>Search Filters</Text>
                        </Pressable>

                        <Pressable style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { router.push('../') }}>
                            <Ionicons name="home" size={16} color={Colors.light.text} style={{ marginTop: 2 }} />
                        </Pressable>
                    </View>
                </View>

                <View style={styles.personContainer}>
                    {/* <Image source={{ uri: currentMatch.avatar_url }} style={styles.person} /> */}
                    <Image source={{ uri: imageUrl }} style={styles.person} />

                    <Pressable onPress={() => { navigation.navigate('Profile', { id: currentMatch.id, imageUrl: imageUrl }) }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
                        < View style={{ width: '100%', height: '66%' }} >
                        </View>
                    </Pressable>

                    <Fader visible position={Fader.position.BOTTOM} tintColor={'#282828'} size={150} />

                    {loading && <ActivityIndicator size="large" color={Colors.light.primary} style={styles.loader} />}

                    {!loading && (
                        <View style={{ width: '78%' }}>
                            <View style={styles.personInfo}>
                                <TypewriterEffect
                                    text={currentMatch.name + ', ' + currentMatch.age.toString()}
                                    style={styles.personName}
                                    delay={12}
                                    numberOfLines={1}
                                    adjustsFontSizeToFit={true}
                                />
                            </View>
                        </View>
                    )}

                    <ScrollView horizontal style={styles.chipsContainer} showsHorizontalScrollIndicator={false}>
                        {renderInterestChips()}
                    </ScrollView>
                    {/* <Pressable onPress={() => router.push('../')} style={[styles.buttonClose, defaultStyles.buttonShadow]}>
                        <Ionicons name="close" size={24} color={Colors.light.accent} />
                    </Pressable> */}

                    <Pressable onPress={() => { navigation.navigate('Profile', { id: currentMatch.id, imageUrl: imageUrl }) }} style={[styles.buttonExpand, defaultStyles.buttonShadow]}>
                        <Ionicons name="chevron-down" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={styles.buttonsMatching}>
                    <Pressable onPress={handleDislike} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={handleLike} disabled={loading}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                    </Pressable>
                    <Pressable onPress={() => { alert("This feature will be available in the future.") }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },
    header: {
        width: '100%',
        marginTop: 16,
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

    loader: {
        position: 'absolute',
        top: 32,
        left: 32,
        zIndex: 5,
    },
    personInfo: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        gap: 8,
        position: 'absolute',
        bottom: 64,
        left: 16,
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
        borderWidth: 0,
    },
    chipLabel: {
        color: Colors.light.text,
        fontSize: 13,
        fontFamily: 'BodyRegular',
    },
    buttonClose: {
        backgroundColor: Colors.light.white,
        width: 32,
        height: 32,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        borderRadius: 99,
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
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Colors.light.black,
        position: 'absolute',
        bottom: 68,
        right: 16,
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
    sharedChip: {
        paddingLeft: 12,
        backgroundColor: Colors.light.white,
    },
    sharedChipLabel: {
        color: Colors.light.text,
    },
});
