import React from 'react';
import styled from "styled-components/native";

const Elem = styled.Text`
    color: white;
    
`;

const TextBox = (props) => {
    return (
        <Elem style={props.style}>{props.children}</Elem>
    );
};

export default TextBox;
