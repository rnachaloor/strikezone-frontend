import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeJSONData = async (key, value, errorFunc) => {
    try {
        const jsonVal = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonVal)
    } catch (e) {
        errorFunc()
    }
}

export const getJSONData = async (key, errorFunc) => {
    try {
        const jsonVal = await AsyncStorage.getItem(key);
        return jsonVal != null ? JSON.parse(jsonVal) : null;
    } catch (e) {
        errorFunc();
    }
}

export const storeStringData = async (key, value, errorFunc) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        errorFunc()
    }
}

export const getStringData = async (key, errorFunc) => {
    
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (e) {
        errorFunc();
    }
}