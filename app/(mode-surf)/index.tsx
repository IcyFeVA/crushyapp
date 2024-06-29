import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Colors } from '@/constants/Colors';
import hobbiesInterests from '@/constants/Interests';

interface PotentialMatch {
    id: string;
    name: string;
    age: number;
    gender: number;
    avatar_url: string;
    interests: number[];
}

const MatchingView: React.FC = () => {
    const [potentialMatches, setPotentialMatches] = useState<PotentialMatch[]>([]);
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
    const session = useAuth();

    useEffect(() => {
        fetchPotentialMatches();
    }, []);

    const fetchPotentialMatches = async () => {
        if (!session?.user.id) return;

        const { data, error } = await supabase.rpc('get_potential_matches', {
            user_id: session.user.id,
            limit_count: 10,
        });

        if (error) {
            console.error('Error fetching potential matches:', error);
        } else {
            console.log('Potential matches:', data);
            setPotentialMatches(data || []);
        }
    };

    const handleLike = () => {
        // TODO: Implement like functionality
        moveToNextMatch();
    };

    const handleDislike = () => {
        // TODO: Implement dislike functionality
        moveToNextMatch();
    };

    const moveToNextMatch = () => {
        if (currentMatchIndex < potentialMatches.length - 1) {
            setCurrentMatchIndex(currentMatchIndex + 1);
        } else {
            fetchPotentialMatches();
            setCurrentMatchIndex(0);
        }
    };

    const currentMatch = potentialMatches[currentMatchIndex];

    if (!currentMatch) {
        return (
            <View style={styles.container}>
                <Text style={styles.noMatches}>No more potential matches</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: currentMatch.avatar_url }} style={styles.avatar} />
            <Text style={styles.name}>{currentMatch.name}, {currentMatch.age}</Text>
            <View style={styles.interestsContainer}>
                {currentMatch.interests.map((interestId) => {
                    const interest = hobbiesInterests.flat().find(i => i.value === interestId.toString());
                    return (
                        <Text key={interestId} style={styles.interest}>
                            {interest ? interest.label : ''}
                        </Text>
                    );
                })}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleDislike}>
                    <Text style={styles.buttonText}>Dislike</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Text style={styles.buttonText}>Like</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light.background,
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.light.text,
    },
    interestsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginBottom: 20,
    },
    interest: {
        backgroundColor: Colors.light.secondary,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        margin: 5,
        color: Colors.light.text,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: Colors.light.primary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 25,
    },
    buttonText: {
        color: Colors.light.textInverted,
        fontSize: 18,
        fontWeight: 'bold',
    },
    noMatches: {
        fontSize: 18,
        color: Colors.light.textSecondary,
    },
});

export default MatchingView;