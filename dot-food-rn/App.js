import React from "react";
import MainNav from './navigation/MainNav';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, useTheme } from "@react-navigation/native";


export default function App() {
    return (
        <SafeAreaProvider>
            <MainNav></MainNav>
        </SafeAreaProvider>
    )
}
