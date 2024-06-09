import { Image, StyleSheet, Animated, Text, View, FlatList, useWindowDimensions, ImageSourcePropType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from './Spacer';
import { PrimaryButton, PrimaryButtonText, SecondaryButton, SecondaryButtonText } from './buttons/Buttons';
import { useRef } from 'react';
import { defaultStyles } from '@/constants/Styles';


export default function Onboarding() {

    const onboardingContent = [
        {
            id: 1,
            title: 'Step 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding1.png'),
        },
        {
            id: 2,
            title: 'Step 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding2.png'),
        },
        {
            id: 3,
            title: 'Step 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding3.png'),
        },
        {
            id: 4,
            title: 'Step 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding4.png'),
        },
        {
            id: 5,
            title: 'Step 5',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image: require('@/assets/images/onboarding/onboarding5.png'),
        }
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
            <View className='bg-primary-300' >
                <Image source={item.image} style={{ width }} />
                {/* <View>
                    <Text>{item.title}</Text>
                    <Text>{item.description}</Text>
                </View> */}
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

    return (
        <SafeAreaView>
            <View className='flex h-full justify-between'>
                <View className='flex-1/0.7'>
                    <Spacer height={16} />
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} className='m-auto' />
                    <FlatList
                        data={onboardingContent}
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
                    <Pagination count={onboardingContent.length} />
                </View>
                <View className='flex-1/0.3 p-6'>
                    <PrimaryButton onPress={() => { }} style={defaultStyles.buttonShadow}>
                        <PrimaryButtonText>Create account</PrimaryButtonText>
                    </PrimaryButton>
                    <Spacer height={16} />
                    <SecondaryButton onPress={() => { }} style={defaultStyles.buttonShadow}>
                        <SecondaryButtonText>Sign in</SecondaryButtonText>
                    </SecondaryButton>
                    <Spacer height={16} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});
