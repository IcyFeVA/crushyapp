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

const resetUserSearchFilters = async () => {
    const genderPreferencesSet = ['genderPreference', JSON.stringify({ key: '', value: '-' })]
    const ageRangeSet = ['ageRange', JSON.stringify({ key: '', value: '18-30' })]
    const distanceSet = ['distance', JSON.stringify({ key: '40', value: '40' })]
    try {
        await AsyncStorage.multiSet([genderPreferencesSet, ageRangeSet, distanceSet])
    } catch (e) {
        //save error
    }

    console.log("search filters reset")
}


const clearAllStorage = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }

    console.log('CLEARING STORAGE')
}

export { storeData, getData, resetUserSearchFilters, clearAllStorage };