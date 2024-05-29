import React from 'react';
import { View } from 'react-native';
import styled from "styled-components/native";
import { Icon } from 'react-native-elements';
import TextBox from './TextBox';
import {black, white} from "react-native-paper/src/styles/colors";
import Palette from "../../theme/Palette";
import {useTheme} from "@react-navigation/native";


const Cont = styled.View`
    width: 100%;
    flex-direction: row;
    background-color: ${Palette.footer};
    align-items: center;
    padding: 5px;
    color: white;
`

const FatButton = (props) => {
    const { colors } = useTheme();
    return (
        <Cont style = {{backgroundColor: colors.buttons}}>
            <Icon type="antdesign" name={props.icon} color="black" size={40} />
            <TextBox style={{ fontSize: 20, paddingLeft: 10, color: black}}>{props.text}</TextBox>
        </Cont>

    );
};

export default FatButton;
