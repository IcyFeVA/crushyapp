import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

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
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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
    radioButton: {
        flex: 1,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.light.tertiary,
        padding: 16,
        borderRadius: 8,
        marginBottom: 16
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
    },
    checkboxButtonLabel: {
        fontSize: 16,
        fontFamily: 'BodySemiBold',
        color: Colors.light.text
    },
});