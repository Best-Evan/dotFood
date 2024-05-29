import React from 'react';
import { Pressable } from 'react-native';
import styled from "styled-components/native";
import TextBox from './TextBox';
import colours from './../../theme/Palette';

const Container = styled.View`
    width: 80%;
    background-color: ${colours.auth_button};
    margin: 0 auto;
    padding: 15px;
    border-radius: 15px;    
`;

const SubmitButton = (props) => {
    return (
        <Container>
            <Pressable style={{ flex: 1 }} onPress={props.submit}>
                <TextBox style={{ alignSelf: 'center' }}>{props.text}</TextBox>
            </Pressable>
        </Container>
    );
};

export default SubmitButton;
