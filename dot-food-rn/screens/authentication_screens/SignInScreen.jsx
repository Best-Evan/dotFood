import React, { useState } from 'react';
import { View, Button } from 'react-native';
import SpinningForm from '../../src/molecules/SpinningForm';
import colours from "../../theme/Palette";
import {useTheme} from "@react-navigation/native";

const SignInScreen = () => {
    const { colors } = useTheme();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <SpinningForm></SpinningForm>
        </View>
    );
}

export default SignInScreen;
