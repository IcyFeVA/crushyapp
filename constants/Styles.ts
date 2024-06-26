import { Colors } from '@/constants/Colors';
import { Platform, StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
    body: {
        fontFamily: 'BodyRegular',
        color: Colors.light.text,
        fontSize: 16,
        lineHeight: 24
    },
    bodyBold: {
        fontFamily: 'BodyBold',
        color: Colors.light.text,
        fontSize: 16,
        lineHeight: 24
    },
    buttonShadow: {
        shadowColor: Colors.light.black,
        ...Platform.select({
            ios: {
                shadowColor: "#ccc",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    h2: {
        fontSize: 24,
        fontFamily: 'HeadingBold',
        color: Colors.light.text
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    button: {
        flex: 1,
        backgroundColor: Colors.light.primary,
        justifyContent: 'center',
        borderWidth: 1,
        borderBlockColor: 'transparent',
        padding: 16,
        borderRadius: 8,
        height: 48,
        maxHeight: 48,
    },
    buttonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.textInverted
    },
    buttonSecondary: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        height: 48,
        maxHeight: 48,
    },
    buttonSecondaryLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.primary
    },
    settingListButton: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        height: 64,
        maxHeight: 64,
        borderTopWidth: 0,
    },
    settingListButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    radioButton: {
        flex: 1,
        backgroundColor: Colors.light.background,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        height: 64,
    },
    radioButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    checkboxButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        height: 64,
    },
    checkboxButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
    noRadius: {
        borderRadius: 0
    },
});