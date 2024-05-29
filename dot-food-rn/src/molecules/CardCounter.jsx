import React from 'react';
import styled from "styled-components/native";
import TextBox from '../atoms/TextBox';
import { Icon } from 'react-native-elements';
import { Pressable } from 'react-native';
import Palette from "../../theme/Palette";
import {useTheme} from "@react-navigation/native";


const Container = styled.View`
    border-radius: 7px; 
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
`;


const CardCounter = ({ counter, setCounter, ...props }) => {
    const { colors } = useTheme();
    return (
        <Container style = {{backgroundColor: colors.minor_details2}}>
            <Pressable style={{ paddingRight: 15 }} onPress={() => { setCounter(Math.max(props.zeroMin ? 0 : 1, counter - 1)) }}>
                <Icon type="antdesign" name="minus" color="white" />
            </Pressable>
            <TextBox>{counter}</TextBox>
            <Pressable style={{ paddingLeft: 15 }} onPress={() => { setCounter(counter + 1) }}>
                <Icon type="antdesign" name="plus" color="white" />
            </Pressable>
        </Container>
    );
};

export default CardCounter;
