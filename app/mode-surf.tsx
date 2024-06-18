import { Image, SafeAreaView, View, StyleSheet, Text, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Button } from 'react-native-ui-lib';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';
import Spacer from '@/components/Spacer';

export default function Modal() {
    return ( //<Link href="../">Dismiss</Link>
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <Image source={require('@/assets/images/logo/logo_crushy.png')} style={styles.logo} />
                    <Button style={styles.buttonFilter} className="shadow-md active:shadow-none" onPress={() => { }}>
                        <Ionicons name="filter-outline" size={12} color={Colors.light.text} />
                        <Text style={styles.buttonFilterText}>Search Filters <Text style={{ fontFamily: 'BodySemiBold' }}>(4)</Text></Text>
                    </Button>
                </View>
                <View style={styles.personContainer}>
                    <Image source={require('@/assets/images/dummies/dummy1.png')} style={styles.person} />
                    <Pressable onPress={() => router.push('../')} style={styles.buttonClose} className='shadow-md active:shadow-none' >
                        <Ionicons name="close" size={24} color={Colors.light.accent} />
                    </Pressable>
                    <Pressable onPress={() => { }} style={styles.buttonExpand} className='shadow-md active:shadow-none' >
                        <Ionicons name="chevron-down" size={24} color={Colors.light.accent} />
                    </Pressable>
                </View>
                <View style={styles.buttonsMatching}>
                    <Pressable onPress={() => { }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingDislike.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingLike.png')} style={styles.buttonsMatchingPrimary} />
                    </Pressable>
                    <Pressable onPress={() => { }}>
                        <Image source={require('@/assets/images/buttons/buttonMatchingChat.png')} style={styles.buttonsMatchingSecondary} />
                    </Pressable>
                </View>
            </View>
        </SafeAreaView >
    );
}
const styles = StyleSheet.create({
    personContainer: {
        flex: 1,
        borderRadius: 20,
        overflow: 'hidden',
    },
    person: {
        height: '100%',
        maxWidth: '100%',
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 48,
        backgroundColor: Colors.light.background,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
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
        paddingVertical: 6,
        paddingHorizontal: 16,
        paddingBottom: 8,
        borderRadius: 99,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        shadowColor: Colors.light.primary,
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
    }
});