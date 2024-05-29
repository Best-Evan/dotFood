import React, { useRef, Component } from 'react';
import { Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export class GradientHelper extends Component {
    render() {
        const {
            color1,
            color2,
            start = { x: 0, y: 0 },
            end = { x: 0, y: 1 }
        } = this.props;
        return (
            <LinearGradient
                colors={[color1, color2]}
                start={start}
                end={end}
                style={{ flex: 1 }}
            />
        );
    }
}


export default RecipesScreen = () => {
    const colorValue = useRef(new Animated.Value(0)).current;
    const color1 = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['rgba(255, 255, 255, 1)', "rgba(255, 255, 0, 1)"]
    });
    const color2 = colorValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["rgba(0, 0, 0, 1)", "rgba(0, 255, 0, 1)"]
    });
    const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);

    const changeColor = () => {
        Animated.timing(colorValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: false
        }).start()
    }

    return (
        <>
            <AnimatedGradientHelper
                color1={color2}
                color2={color1}
            />
        </>
    );

}
