import React, { useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { storeData } from '@/utils/storage';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Spacer from "@/components/Spacer";
import { Button } from 'react-native-ui-lib';
import Slider from '@react-native-community/slider';
import { useAppContext } from '@/providers/AppProvider';

const MIN_AGE = 18;
const MAX_AGE = 100;

export default function SetAgeRange() {
    const { searchFilters, setSearchFilters } = useAppContext();
    const [localMinAge, setLocalMinAge] = useState(searchFilters?.ageRange?.min ?? MIN_AGE);
    const [localMaxAge, setLocalMaxAge] = useState(searchFilters?.ageRange?.max ?? MAX_AGE);

    useEffect(() => {
        if (searchFilters?.ageRange.min && searchFilters?.ageRange.max) {
            const validMinAge = Math.max(MIN_AGE, Math.min(searchFilters.ageRange.min, MAX_AGE));
            const validMaxAge = Math.max(validMinAge, Math.min(searchFilters.ageRange.max, MAX_AGE));
            setLocalMinAge(validMinAge);
            setLocalMaxAge(validMaxAge);
        }
    }, [searchFilters]);

    const handleSliderChange = useCallback((type: 'min' | 'max', value: number) => {
        if (type === 'min') {
            const validMinAge = Math.min(Math.max(value, MIN_AGE), localMaxAge);
            setLocalMinAge(validMinAge);
        } else {
            const validMaxAge = Math.max(Math.min(value, MAX_AGE), localMinAge);
            setLocalMaxAge(validMaxAge);
        }
    }, [localMinAge, localMaxAge]);

    const handleSliderComplete = useCallback(() => {
        setSearchFilters(prevFilters => ({
            ...prevFilters,
            ageRange: {
                min: localMinAge,
                max: localMaxAge
            }
        }));
    }, [localMinAge, localMaxAge, setSearchFilters]);

    const handleSave = useCallback(() => {
        const ageRangeValue = `${localMinAge}-${localMaxAge}`;
        storeData('ageRange', { min: localMinAge, max: localMaxAge })
            .then(() => {
                console.log('ageRange:', ageRangeValue);
                router.dismiss();
            })
            .catch(error => console.error('Failed to save age range:', error));
    }, [localMinAge, localMaxAge]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={defaultStyles.h2}>Age Range Preference</Text>
                <Spacer height={8} />
                <Text style={defaultStyles.body}>Set your preferred age range for potential matches.</Text>
                <Spacer height={48} />

                <Text style={styles.label}>Minimum Age: {Math.round(localMinAge)}</Text>
                <Slider
                    value={localMinAge}
                    minimumValue={MIN_AGE}
                    maximumValue={localMaxAge}
                    onValueChange={(value) => handleSliderChange('min', Math.round(value))}
                    onSlidingComplete={handleSliderComplete}
                    step={1}
                    style={styles.slider}
                />

                <Spacer height={24} />

                <Text style={styles.label}>Maximum Age: {Math.round(localMaxAge)}</Text>
                <Slider
                    value={localMaxAge}
                    minimumValue={localMinAge}
                    maximumValue={MAX_AGE}
                    onValueChange={(value) => handleSliderChange('max', Math.round(value))}
                    onSlidingComplete={handleSliderComplete}
                    step={1}
                    style={styles.slider}
                />

                <Spacer height={48} />

                <Button
                    label="Save"
                    onPress={handleSave}
                    style={[defaultStyles.button, defaultStyles.buttonShadow]}
                    labelStyle={defaultStyles.buttonLabel}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
    },
    label: {
        ...defaultStyles.body,
        marginBottom: 8,
    },
    slider: {
        width: '100%',
        height: 40,
    },
});