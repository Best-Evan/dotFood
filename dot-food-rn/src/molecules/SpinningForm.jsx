import React, { useState } from 'react';
import { Animated } from 'react-native';
import { View, Text, Button } from 'react-native';
import styled from "styled-components/native";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


const Rotatable = styled(Animated.View)`
    width: 100%;    
    height: 100%;
    backface-visibility: hidden;
    border-radius: 40px;
`;

const Container = styled.View`
    width: 90%;
    height: 60%;
    margin: auto;
`

function SpinningForm() {
    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
    const [isRotating, setRotating] = useState(false);


    const FrontSpin = () => {
        Animated.timing(rotateAnimation, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false
        }).start(() => setRotating(false));
    };

    const BackSpin = () => {
        Animated.timing(rotateAnimation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: false
        }).start(() => setRotating(false));
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg']
    });

    const interpolateZIndex = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [10, -10]
    });


    const interpolateRotatingBack = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['180deg', '0deg']
    });

    const interpolateZIndexBack = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [-10, 10]
    });

    const animatedStyle = {
        position: "absolute",
        zIndex: interpolateZIndex,
        transform: [
            {
                rotateY: interpolateRotating,
            },
        ],
    };

    const animatedStyleBack = {
        position: "absolute",
        zIndex: interpolateZIndexBack,
        transform: [
            {
                rotateY: interpolateRotatingBack,
            },
        ],
    };

    function Rotate() {
        if (isRotating) return;

        setRotating(true);

        if (rotateAnimation._value == 1) {
            BackSpin();
        }
        else {
            FrontSpin();
        }
    }

    return (
        <Container>
            <Rotatable style={animatedStyleBack}>
                <RegisterForm rotate={Rotate}></RegisterForm>
            </Rotatable>
            <Rotatable style={animatedStyle}>
                <LoginForm rotate={Rotate}></LoginForm>
            </Rotatable>
        </Container>
    );
}



export default SpinningForm;
