import React from 'react';
import { View } from 'react-native';
import styled from "styled-components/native";
import { Icon } from 'react-native-elements';
import TextBox from './TextBox';
import {black} from "react-native-paper/src/styles/colors";

const Cont = styled.View`
    width: 90%;
    flex-direction: row;
    background-color: white;
    align-items: center;
    padding: 5px;
    color: black;
    border-width: 2px;
    border: white;
    border-top-color: black;
`

const SettingRow = (props) => {
    return (
        <Cont>
            <Icon type="antdesign" name={props.icon} color="black" size={40} />
            <TextBox style={{ fontSize: 20, paddingLeft: 10, color: black }}>{props.text}</TextBox>
        </Cont>

    );
};

export default SettingRow;
