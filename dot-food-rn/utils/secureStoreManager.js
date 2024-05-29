import * as SecureStore from 'expo-secure-store';

export default class SecureStoreManager {
    static async getToken() {
        const response = await SecureStore.getItemAsync('token');
        return response;
    }

    static async storeToken(token) {
        await SecureStore.setItemAsync('token', token);
    }

    static async removeToken() {
        await SecureStore.deleteItemAsync('token');
    }
}