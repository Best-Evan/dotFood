import React, { useState } from 'react';
import HomeNav from './HomeNav';
import AuthNav from './AuthNav';
import AuthContext from '../contexts/AuthContext';
import * as SecureStore from 'expo-secure-store';
import tokenReducer from '../hooks/tokenReducer';
import TextBox from '../src/atoms/TextBox';
import AuthFunctions from './../hooks/authFunctions';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './../screens/app_screens/ProfileScreen';
import lightTheme from './../theme/lightTheme';
import PreloaderScreen from '../screens/app_screens/PreloaderScreen';

const MainNav = (props) => {
    const [authorized, setAuth] = useState(true); // выставить true, чтобы верстать свой экран, false - логин
    const [authState, dispatch] = tokenReducer();

    const [currentTheme, setTheme] = useState(lightTheme);

    React.useEffect(async () => {
        // Fetch the token from storage then navigate to our appropriate place
        const tokenFetchAsync = async () => {
            let userToken = "null";
            try {
                userToken = await SecureStore.getItemAsync('token');
            } catch (e) {
                console.log(e);
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        setTimeout(async() => {
            await tokenFetchAsync();
        }, 3500);
    }, []);

    const authContext = AuthFunctions(dispatch);
    const Stack = createNativeStackNavigator();
    if (authState.isLoading) {
        return (
            <PreloaderScreen></PreloaderScreen>
        )
    }

    return (
        <AuthContext.Provider value={{ authFunctions: authContext, authState: authState, setTheme: setTheme }}>
            <NavigationContainer theme={currentTheme}>
                {JSON.parse(authState.userToken) ?
                    <Stack.Navigator>
                        <Stack.Screen
                            name="HomeScreens"
                            component={HomeNav}
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                            options={{ headerShown: false }}
                        />
                    </Stack.Navigator>

                    :
                    <AuthNav></AuthNav>
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
};

export default MainNav;
