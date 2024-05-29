import React from 'react';
import { View } from 'react-native';
import TextBox from '../../src/atoms/TextBox';
import TypeWriter from 'react-native-typewriter'


const PreloaderScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <TypeWriter style={{color: "black", fontSize: 30, fontFamily: "sans-serif-light" }} minDelay={50} typing={1}>.food team presents</TypeWriter>
        </View>
    );
};

export default PreloaderScreen;