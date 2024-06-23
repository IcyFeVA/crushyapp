import AsyncStorage from '@react-native-async-storage/async-storage';

// usage:
/*
    import { getData, storeData } from '@/utils/storage';

    storeData('user', session);

    getData('user').then(user => {
        console.log(user);
    });
*/

const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving data', e);
    }
};
const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (e) {
        console.error('Error reading data', e);
    }
};

export { storeData, getData };