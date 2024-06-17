import { Image, StyleSheet, Animated, Pressable, Dimensions, Alert, useWindowDimensions, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from '@supabase/supabase-js';
import { Pageview } from '@/components/ui/Containers';
import Spacer from '@/components/Spacer';
import { FlatList } from 'react-native';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from '@/components/ui/Buttons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Card, CardProps, Text, RadioButton, Checkbox } from 'react-native-ui-lib';
import { Textfield } from '@/components/ui/Textfields';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import Toast, { ToastRef } from 'react-native-toast-message';
import hobbiesInterests from '@/constants/Interests';
import BigList from "react-native-big-list"
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow'
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import Avatar from '@/components/Avatar';

const screenWidth = Dimensions.get('window').width;

const useOnboardingStore = create((set) => ({
    name: '',
    age: null,
    gender: null,
    pronouns: [],
    relationship: null,
    genderPreferences: null,
    interests: [],
    photoUploaded: false,
    dataUploaded: false,
    onboardingCompleted: false,
    setName: () => set((state: { name: string; }) => ({ name: state.name })),
    setAge: () => set((state: { age: string; }) => ({ age: state.age })),
    setGender: () => set((state: { gender: string; }) => ({ gender: state.gender })),
    setPronouns: () => set((state: { pronouns: object; }) => ({ pronouns: state.pronouns })),
    setRelationship: () => set((state: { relationship: string; }) => ({ relationship: state.relationship })),
    setGenderPreferences: () => set((state: { genderPreferences: string; }) => ({ genderPreferences: state.genderPreferences })),
    setInterests: () => set((state: { interests: object; }) => ({ interests: state.interests })),
}))



const Onboarding = ({ setShowOnboarding }: { setShowOnboarding: any }) => {
    const session = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const flatListRef = useRef(null);
    const [name, age, gender, pronouns, relationship, genderPreferences, interests, photoUploaded, dataUploaded, onboardingCompleted] = useOnboardingStore(
        useShallow((state) => [state.name, state.age, state.gender, state.pronouns, state.relationship, state.genderPreferences, state.interests, state.photoUploaded, state.dataUploaded, state.onboardingCompleted]),
    )
    const toastConfig = {
        default: ({ text1, text2, props }) => (
            <View style={{ display: 'flex', justifyContent: 'center', width: '94%', backgroundColor: Colors.light.accent, borderColor: Colors.light.white, borderRadius: 8, padding: 16 }}>
                <Text style={{ fontFamily: 'HeadingBold', color: Colors.light.textInverted }}>{text1}</Text>
                <Text style={{ fontFamily: 'BodyRegular', color: Colors.light.textInverted }}>{text2}</Text>
            </View>
        )
    };

    const steps: object[] = [
        { key: '1', title: 'Step 1', component: StepName },
        { key: '2', title: 'Step 2', component: StepAge },
        { key: '3', title: 'Step 3', component: StepGender },
        { key: '4', title: 'Step 4', component: StepPronouns },
        { key: '6', title: 'Step 6', component: StepRelationship },
        { key: '7', title: 'Step 7', component: StepGenderPreferences },
        { key: '8', title: 'Step 8', component: StepInterests },
        { key: '9', title: 'Step 9', component: StepPhoto },
    ];



    function handleNext() {

        console.log('currentStep:', currentStep);

        if (currentStep === 0) {
            if (name.length < 2) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Your name is too short',
                });
                return
            }
            // check if name containes the words crushy or crush or official
            const words = ['crushy', 'crush', 'official', 'admin', 'administrator', 'moderator', 'ceo', 'cmo', 'cto'];
            const contains = words.some(word => name.toLowerCase().includes(word));
            if (contains) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'This name is not allowed',
                });
                return
            }
        }
        if (currentStep === 1) {
            if (age === null || parseInt(age) > 2006 || parseInt(age) < 1924) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Check your age',
                    text2: 'You have to be 18 or older to continue',
                });
                return
            }
        }
        if (currentStep === 2) {
            if (gender === null) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Please select your gender',
                });
                return
            }
        }

        if (currentStep === 3) {
            if (pronouns === null || pronouns < 1) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Please select at least one pronoun',
                });
                return
            }
        }

        if (currentStep === 4) {
            if (relationship === null || relationship < 1) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Please select what you are looking for',
                });
                return
            }
        }

        if (currentStep === 5) {
            if (genderPreferences === null || genderPreferences < 1) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Please select your gender preferences',
                });
                return
            }
        }

        if (currentStep === 6) {
            if (interests.length === 0) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Please select at least one hobby or interest',
                });
                return
            }
        }

        if (currentStep === 7) {
            if (photoUploaded === false) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'Please upload a photo',
                });
                return
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: currentStep + 1 });
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            if (flatListRef.current) {
                flatListRef.current.scrollToIndex({ index: currentStep - 1 });
            }
        }
    };


    const handleDone = async () => {

        console.log('name:', name);
        console.log('age:', age);
        console.log('gender:', gender);
        console.log('pronouns:', pronouns);
        console.log('relationship:', relationship);
        console.log('genderPreferences:', genderPreferences);
        console.log('interests:', interests);


        try {
            const { data, error } = await supabase
                .from('profiles')
                .update({
                    name: name,
                    age: age,
                    gender: gender,
                    pronouns: pronouns,
                    looking_for: relationship,
                    gender_preference: genderPreferences,
                    interests: interests,
                })
                .eq('id', session?.user.id)
                .select();

            if (error) {
                console.error(error);
            } else {
                console.log(data);
                useOnboardingStore.setState({ dataUploaded: true })
            }
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <View  >
            {dataUploaded ? (
                <StepFinal />
            ) : (
                <View className='flex h-full justify-between bg-white'>
                    <FlatList
                        ref={flatListRef}
                        data={steps}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        scrollEnabled={false}
                        renderItem={({ item }) => React.createElement(item.component)}
                        keyExtractor={item => item.key}
                    />
                    <View style={styles.buttonContainer}>
                        {currentStep > 0 ? (
                            <SecondaryButton onPress={handleBack} style={defaultStyles.buttonShadow}>
                                <SecondaryButtonText>Back</SecondaryButtonText>
                            </SecondaryButton>
                        ) : (
                            <SecondaryButton disabled className=' bg-gray-100 border-gray-100'>
                                <SecondaryButtonText className='text-gray-400'>Back</SecondaryButtonText>
                            </SecondaryButton>
                        )}
                        {currentStep < steps.length - 1 ? (
                            <PrimaryButton onPress={handleNext} style={defaultStyles.buttonShadow}>
                                <PrimaryButtonText>Next</PrimaryButtonText>
                            </PrimaryButton>
                        ) : (
                            <PrimaryButton onPress={handleDone} style={defaultStyles.buttonShadow}>
                                <PrimaryButtonText>Done</PrimaryButtonText>
                            </PrimaryButton>
                        )}
                    </View>
                </View>
            )}

            <Toast config={toastConfig} />
        </View>
    );
};



function Progress({ percent }: { percent: number }) {
    return (
        <View className='w-full h-2 bg-gray-200 rounded-full relative'>
            <View style={{ width: `${percent}%`, backgroundColor: Colors.light.accent }} className='h-2 absolute rounded-full'></View>
        </View>
    )
}


const StepName = () => {
    const [name, setName] = useState<string>('');

    return (
        <View className='p-6 w-screen'>

            <Spacer height={16} />

            <Progress percent={11} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What is your name?</Text>
            <Spacer height={8} />
            <View className=''>
                <Text style={defaultStyles.body}>This will be visible to all users. You can also choose a nickname if you would like.</Text>
            </View>

            <Spacer height={64} />

            <Text style={defaultStyles.inputLabel}>Firstname or Nickname</Text>
            <Spacer height={4} />
            <Textfield
                onChangeText={(text) => useOnboardingStore.setState({ name: text })}
            />
        </View>
    )
};

const StepAge = () => (
    <View className='p-6 w-screen'>
        <Spacer height={16} />

        <Progress percent={22} />

        <Spacer height={48} />

        <Text style={defaultStyles.h2}>In what year were you born?</Text>
        <Spacer height={8} />
        <View className=''>
            <Text style={defaultStyles.body}>You can always change your settings later.</Text>
        </View>

        <Spacer height={64} />

        <Text style={defaultStyles.inputLabel}>Year of birth</Text>
        <Spacer height={4} />
        <Textfield
            className='w-28 text-center'
            placeholder='YYYY'
            keyboardType='numeric'
            maxLength={4}
            onChangeText={(text) => useOnboardingStore.setState({ age: text })}
        />
    </View>
);

const StepGender = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        useOnboardingStore.setState({ gender: value })
        console.log('Gender:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={33} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>How do you identify in terms of gender?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>We strive for inclusivity. If you don't see a gender that fits you, please let us know.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Male' },
                    { key: '2', title: 'Female' },
                    { key: '3', title: 'Male (Transgender)' },
                    { key: '4', title: 'Female (Transgender)' },
                    { key: '5', title: 'Non-binary' },
                    { key: '6', title: 'Genderqueer' },
                    { key: '7', title: 'Genderfluid' },
                    { key: '8', title: 'Agender' },
                    { key: '9', title: 'Two-Spirit' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RadioButton
                        label={item.title}
                        size={20}
                        color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                        labelStyle={defaultStyles.radioButtonLabel}
                        selected={selectedValue === item.key}
                        onPress={() => handlePress(item.key)}
                    />
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepPronouns = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handlePress = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            if (selectedValues.length > 1) {
                Toast.show({
                    type: 'default',
                    text1: '👋 Hey',
                    text2: 'You can only select two pronouns',
                });
                return;
            }
            setSelectedValues([...selectedValues, value]);
        }
    };

    useEffect(() => {
        console.log('Pronouns:', selectedValues);
        useOnboardingStore.setState({ pronouns: selectedValues })
    }, [selectedValues]);

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={44} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are your pronouns? ({selectedValues.length})</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>Choose <Text style={defaultStyles.bodyBold}>up to two</Text> pronouns.You will be able to add your own in a future update, if you don't see yours.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'he/him' },
                    { key: '2', title: 'she/her' },
                    { key: '3', title: 'they/them' },
                    { key: '4', title: 'ze/zir' },
                    { key: '5', title: 'xe/xem' },
                    { key: '6', title: 've/ver' },
                    { key: '7', title: 'ey/em' },
                    { key: '99', title: 'other' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <Pressable onPress={() => handlePress(item.key)}>
                        <Checkbox
                            color={selectedValues.includes(item.key) ? Colors.light.text : Colors.light.tertiary}
                            label={item.title}
                            value={selectedValues.includes(item.key) ? true : false}
                            containerStyle={[defaultStyles.checkboxButton, { borderColor: selectedValues.includes(item.key) ? Colors.light.text : Colors.light.tertiary }]}
                            labelStyle={defaultStyles.checkboxButtonLabel}
                            onValueChange={() => handlePress(item.key)}
                        />
                    </Pressable>
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepRelationship = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        useOnboardingStore.setState({ relationship: value })
        console.log('Relationship:', value, typeof value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={55} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are you looking for right now?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>You can always change your settings later.</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Relationship' },
                    { key: '2', title: 'Friend' },
                    { key: '3', title: 'Hookup' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RadioButton
                        label={item.title}
                        size={20}
                        color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                        labelStyle={defaultStyles.radioButtonLabel}
                        selected={selectedValue === item.key}
                        onPress={() => handlePress(item.key)}
                    />
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepGenderPreferences = () => {
    const [selectedValue, setSelectedValue] = useState('');

    const handlePress = (value: string) => {
        setSelectedValue(value);
        useOnboardingStore.setState({ genderPreferences: value })
        console.log('Gender Preferences:', value);
    };

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={66} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>What are your gender preferences?</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>Please understand that this app is new. We will include more gender filters soon!</Text>
            </View>

            <Spacer height={48} />

            <FlatList
                className='py-4'
                data={[
                    { key: '1', title: 'Female' },
                    { key: '2', title: 'Male' },
                    { key: '3', title: 'Both' },
                ]}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <RadioButton
                        label={item.title}
                        size={20}
                        color={selectedValue === item.key ? Colors.light.text : Colors.light.tertiary}
                        contentOnLeft
                        containerStyle={[defaultStyles.radioButton, { borderColor: selectedValue === item.key ? Colors.light.text : Colors.light.tertiary }]}
                        labelStyle={defaultStyles.radioButtonLabel}
                        selected={selectedValue === item.key}
                        onPress={() => handlePress(item.key)}
                    />
                )}
                keyExtractor={item => item.key}
                showsVerticalScrollIndicator={false}
                bounces={false}
            />
        </View >
    );
};

const StepInterests = () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);

    const handlePress = (value: string) => {
        if (selectedValues.includes(value)) {
            setSelectedValues(selectedValues.filter(item => item !== value));
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    };

    useEffect(() => {
        useOnboardingStore.setState({ interests: selectedValues })
        console.log('Interests:', selectedValues);
    }, [selectedValues]);

    const renderItem = ({ item }: { item: { label: string, value: string } }) => (
        // TODO: Pressable adds weird padding
        // <Pressable onPress={() => handlePress(item.value)} >
        <Checkbox
            color={selectedValues.includes(item.value) ? Colors.light.text : Colors.light.tertiary}
            label={item.label}
            value={selectedValues.includes(item.value)}
            containerStyle={[defaultStyles.checkboxButton]}
            labelStyle={defaultStyles.checkboxButtonLabel}
            onValueChange={() => handlePress(item.value)}
        />
        // </Pressable >
    );

    const ITEM_HEIGHT = 75;

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={77} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>Interests ({selectedValues.length})</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>
                    This helps us find people with the same hobbies and interests.
                </Text>
            </View>

            <Spacer height={24} />

            <BigList
                // data={hobbiesInterests}
                sections={hobbiesInterests}
                renderItem={renderItem}
                renderSectionHeader={(section) => {
                    const categories = [
                        "Outdoor Activities",
                        "Sports & Fitness",
                        "Creative Arts",
                        "Entertainment & Media",
                        "Culinary Interests",
                        "Social Activities",
                        "Tech & Science",
                        "Intellectual Pursuits",
                        "Nature & Animals",
                        "Miscellaneous"
                    ];
                    return (
                        <View style={{ backgroundColor: Colors.light.white }}>
                            <Text style={{ fontFamily: 'HeadingBold', fontSize: 20, color: Colors.light.accent }}>{categories[section]}</Text>
                        </View>
                    )
                }}
                keyExtractor={(item) => item.value}

                // ListHeaderComponent={`renderHeader`} // Replaceable with `renderHeader`
                // ListFooterComponent={<Spacer height={48} />}
                // ListEmptyComponent={`renderEmpty`} // Replaceable with `renderEmpty`

                getItemLayout={(data, index) => ({
                    length: ITEM_HEIGHT,
                    offset: ITEM_HEIGHT * index,
                    index,
                })} // Replaceable with `itemHeight={ITEM_HEIGHT}`
                headerHeight={0} // Default 0, need to specify the header height
                footerHeight={48} // Default 0, need to specify the foorer height
                sectionHeaderHeight={48}
            />
        </View>
    );
};
// TODO: prevent next step without uploading photo first
const StepPhoto = () => {
    const [loading, setLoading] = useState(true)
    const [avatarUrl, setAvatarUrl] = useState('')
    const session = useAuth();

    async function updateProfile({
        avatar_url,
    }: {
        avatar_url: string
    }) {
        try {
            setLoading(true)
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                avatar_url,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            } else {

            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
            useOnboardingStore.setState({ photoUploaded: true })
            setLoading(false)
        }
    }

    return (
        <View className='p-6 w-screen'>
            <Spacer height={16} />

            <Progress percent={88} />

            <Spacer height={48} />

            <Text style={defaultStyles.h2}>Your Photo</Text>
            <Spacer height={8} />
            <View>
                <Text style={defaultStyles.body}>
                    You can only add one. So, make it count :)
                </Text>
            </View>

            <Spacer height={24} />

            <View className=''>
                <Avatar
                    size={80}
                    url={avatarUrl}
                    onUpload={(url: string) => {
                        setAvatarUrl(url)
                        updateProfile({ avatar_url: url })
                    }}
                />
            </View>

        </View>
    );
};

const StepFinal = () => {

    const [relationshipType] = useOnboardingStore(
        useShallow((state) => [state.relationship]),
    )
    console.log('relationshipType', relationshipType)

    let subHeading = `Since you chose to look for a relationship, “Dive mode” was automatically activated.`
    if (relationshipType == 2) {
        subHeading = `Since you chose to look for friendship, "Dive mode" was automatically activated. You can change this in your settings.`
    } else if (relationshipType == 3) {
        subHeading = `Since you are looking for a hookup, “Surf mode” has been activated.`
    }

    const finalSlidesContent = [
        {
            id: 1,
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding3.png'),
        },
        {
            id: 2,
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding4.png'),
        },
    ]




    interface OnboardingItem {
        id: number;
        title: string;
        description: string;
        image: ImageSourcePropType;
    }

    const { width } = useWindowDimensions();

    function renderItem({ item }: { item: OnboardingItem }) {
        return (
            <View className='' >
                <Image source={item.image} style={{ width }} />
            </View >
        )

    }


    const scrollX = useRef(new Animated.Value(0)).current;

    const Pagination = ({ count }: { count: number }) => {
        return (
            <View className='flex-row justify-center'>
                {Array(count).fill(0).map((_, index) => {
                    const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
                    const dotColor = scrollX.interpolate({
                        inputRange,
                        outputRange: ['#cccccc', '#7A37D0', '#cccccc'],
                        extrapolate: 'clamp'
                    });
                    return (
                        <Animated.View
                            key={index}
                            className='w-2 h-2 mx-1 rounded-full'
                            style={{ backgroundColor: dotColor }}
                        />
                    );
                })}
            </View>
        );
    };

    const handleDone = () => {
        useOnboardingStore.setState({ dataUploaded: true })

        // TODO: save in local storage

        return router.replace('/(tabs)')
    }



    return (
        <View className='w-screen flex justify-between h-full bg-white'>
            <View>
                <View className='p-6'>
                    <Spacer height={24} />
                    <Text style={defaultStyles.h2}>You are all set!</Text>
                    <Spacer height={8} />
                    <Text style={defaultStyles.body}>{subHeading}</Text>
                    <Spacer height={24} />
                    <Text style={defaultStyles.bodyBold}>Surf and Dive modes explained</Text>
                </View>
                <FlatList
                    data={finalSlidesContent}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                />
                <Pagination count={finalSlidesContent.length} />
            </View>
            <View className='p-6'>
                <PrimaryButton onPress={handleDone} style={defaultStyles.buttonShadow}>
                    <PrimaryButtonText>Got it</PrimaryButtonText>
                </PrimaryButton>
            </View>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 16,
    },
    stepContainer: {
        // width: '100%',
        // alignItems: 'center',
    },
    title: {
        // fontSize: 24,
        // marginBottom: 16,
    },
    formStep: {
        // width: '100%',
        // padding: 16,
    },
    input: {
        // height: 40,
        // borderColor: 'gray',
        // borderWidth: 1,
        // marginBottom: 12,
        // paddingHorizontal: 8,
        // width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 8,
        width: screenWidth * 0.5 - 20,
        marginHorizontal: 16,
        marginBottom: 16,
    },
});

export default Onboarding;


