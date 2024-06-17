import { View } from 'react-native';
import { Link, router } from 'expo-router';

export default function Modal() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Link href="../">Dismiss</Link>
        </View>
    );
}
