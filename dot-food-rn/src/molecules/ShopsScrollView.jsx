import React, { useRef } from 'react';
import { Animated, Button, ScrollView } from 'react-native';
import { View } from 'react-native';
import TextBox from './../atoms/TextBox';
import { useEffect } from 'react';

const ShopsScrollView = (props) => {
    return (
        <Animated.ScrollView
            ref={props.scrollRef}
            style={{ position: "absolute", bottom: 60, width: "100%", zIndex: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: props.animation } } }],
                {
                    useNativeDriver: false,
                },
            )}
        >
            <View style={{ paddingLeft: 30, paddingRight: 30, flexDirection: "row" }}>
                {props.children}
            </View>
        </Animated.ScrollView>
    );
};

export default ShopsScrollView;