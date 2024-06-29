import { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';
import { defaultStyles } from '@/constants/Styles';
import Spacer from '@/components/Spacer';
import TypewriterEffect from '@/components/TypewriterEffect';
import { Chip } from 'react-native-ui-lib';
import { router } from 'expo-router';

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

const MatchingView: React.FC = () => {
    const [potentialMatches, setPotentialMatches] = useState<PotentialMatch[]>([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const [userInterests, setUserInterests] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const session = useAuth();

    const fetchUserAndPotentialMatches = useCallback(async () => {
        if (!session?.user.id) return;
        setLoading(true);

        // Fetch user interests
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('interests')
            .eq('id', session.user.id)
            .single();

        if (userError) {
            console.error('Error fetching user interests:', userError);
            setLoading(false);
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
            setLoading(false);
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
        setLoading(false);
    }, [session?.user.id]);

    useEffect(() => {
        fetchUserAndPotentialMatches();
    }, [fetchUserAndPotentialMatches]);

    const handleLike = () => {
        // TODO: Implement like functionality
        moveToNextMatch();
    };

    const handleDislike = () => {
        // TODO: Implement dislike functionality
        moveToNextMatch();
    };

    const moveToNextMatch = () => {
        setLoading(true);
        if (currentMatchIndex < potentialMatches.length - 1) {
            setCurrentMatchIndex(currentMatchIndex + 1);
            setLoading(false);
        } else {
            fetchUserAndPotentialMatches();
            setCurrentMatchIndex(0);
        }
    };

    const currentMatch = potentialMatches[currentMatchIndex];

    const renderInterestChips = () => {
        if (!currentMatch) return null;

        // Sort interests: shared interests first, then non-shared
        const sortedInterests = [...currentMatch.interests].sort((a, b) => {
            if (a.isShared && !b.isShared) return -1;
            if (!a.isShared && b.isShared) return 1;
            return 0;
        });

        return sortedInterests.map((interest) => {
            const interestObject = hobbiesInterests.flat().find(item => item.value === interest.id.toString());

            if (!interestObject) {
                console.error(`No label found for interest: ${interest.id}`);
                return null;
            }

            return (
                <Chip
                    key={interest.id}
                    label={interestObject.label}
                    labelStyle={[styles.chipLabel, interest.isShared && styles.sharedChipLabel]}
                    containerStyle={[styles.chip, interest.isShared && styles.sharedChip]}
                />
            );
        });
    };

    if (!currentMatch) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.noMatchesContainer}>
                    <Ionicons name="albums-outline" size={64} color={Colors.light.primary} />
                    <Text style={styles.noMatchesTitle}>You've reached the end</Text>
                    <Text style={styles.noMatchesText}>No more potential matches to show.</Text>
                    <Text style={styles.noMatchesText}>Try changing your search filter.</Text>
                    <Spacer height={64} />
                    <Pressable onPress={fetchUserAndPotentialMatches}>
                        <Text style={styles.refreshText}>Refresh Matches</Text>
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
                    <Pressable style={[styles.buttonFilter, defaultStyles.buttonShadow]} onPress={() => { router.push('searchFilters') }}>
                        <Ionicons name="search" size={12} color={Colors.light.text} />
                        <Text style={styles.buttonFilterText}>Search Filters</Text>
                    </Pressable>
                </View>

                <View style={styles.personContainer}>
                    <Image source={{ uri: currentMatch.avatar_url }} style={styles.person} />
                    {loading && <ActivityIndicator size="large" color={Colors.light.primary} style={styles.loader} />}
                    <View style={styles.personInfo}>
                        {!loading && (
                            <>
                                <Text style={styles.personName}>{currentMatch.name} </Text>
                                <Text style={styles.personAge}>{currentMatch.age}</Text>
                            </>
                        )}
                    </View>
                    <ScrollView horizontal style={styles.chipsContainer} showsHorizontalScrollIndicator={false}>
                        {renderInterestChips()}
                    </ScrollView>
                    <Pressable onPress={() => router.push('../')} style={[styles.buttonClose, defaultStyles.buttonShadow]}>
                        <Ionicons name="close" size={24} color={Colors.light.accent} />
                    </Pressable>
                    <Pressable onPress={() => { router.push(`/detail/${currentMatch.id}?imageUrl=${currentMatch.avatar_url}`) }} style={[styles.buttonExpand, defaultStyles.buttonShadow]}>
                        <Ionicons name="chevron-down" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={styles.buttonsMatching}>
                    <Pressable onPress={handleDislike}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={handleLike}>
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
        bottom: 64,
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
        backgroundColor: Colors.light.primary,
    },
    sharedChipLabel: {
        color: Colors.light.white,
    },
});

export default MatchingView;