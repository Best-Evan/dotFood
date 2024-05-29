import { LinearGradient } from 'expo-linear-gradient';
import { Component } from "react";
import { View } from 'react-native';
import { StatusBar } from 'react-native';

export class GradientHelper extends Component {
    render() {
        const {
            style,
            color1,
            color2,
            start = { x: 0, y: 0 },
            end = { x: 0, y: 1 },
            children
        } = this.props;
        return (
            <LinearGradient
                colors={[color1, color2]}
                start={start}
                end={end}
                style={{ flex: 1, zIndex: 10, paddingTop: StatusBar.currentHeight }}
            >
                {this.props.children}
            </LinearGradient>
        );
    }
}
