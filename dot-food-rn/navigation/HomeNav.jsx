import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './../screens/app_screens/MapScreen';
import SearchScreen from './../screens/app_screens/SearchScreen';
import CartScreen from './../screens/app_screens/CartScreen';
import { Icon } from 'react-native-elements';

const Tab = createBottomTabNavigator();

const HomeNav = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Карты"
                component={MapScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<Icon type="antdesign" name="enviroment" />)
                }}
            />
            <Tab.Screen
                name="Поиск"
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<Icon type="antdesign" name="search1" />)
                }}
            />
            <Tab.Screen
                name="Корзина"
                component={CartScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (<Icon type="antdesign" name="shoppingcart" />)
                }}
            />
        </Tab.Navigator>
    );
};



export default HomeNav;
