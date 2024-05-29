import React from 'react';
import AuthManager from '../axios/Auth';
import SecureStoreManager from './../utils/secureStoreManager';

export default function AuthFunctions(dispatch) {
    return React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                const token = await AuthManager.login(data);
                if (token) {
                    try {
                        SecureStoreManager.storeToken(JSON.stringify(token));
                    } catch (e) {
                        console.log(e);
                    }
                    dispatch({ type: 'SIGN_IN', token: JSON.stringify(token) });
                }
            },
            signOut: async () => {
                await SecureStoreManager.removeToken();
                dispatch({ type: 'SIGN_OUT' });
            },
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                const response = await AuthManager.register(data);
                if (response == 200) {
                    const token = await AuthManager.login(data);
                    if (token) {
                        await SecureStoreManager.storeToken(JSON.stringify(token));
                        dispatch({ type: 'SIGN_IN', token: JSON.stringify(token) });
                    }
                }
            },
        }),
        []
    );
}