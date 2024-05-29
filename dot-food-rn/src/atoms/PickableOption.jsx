import React, { useState } from 'react';
import styled from "styled-components/native";
import TextBox from './TextBox';
// import colours from '../../theme/Palette';
import { useTheme } from '@react-navigation/native';

const Main = styled.Pressable`
  padding: 2px 5px;
  margin: 2px 2px;
  border: 2px ${props => props.colour} solid;
  border-radius: 70px;
`;

const PickableOption = (props) => {
    const [selected, setSelected] = useState(true);
    const { colors } = useTheme();
    return (
        <Main
            onPress={() => {
                props.setSelectedShops({ ...props.selectedShops, [props.name]: !selected });
                setSelected(!selected)
            }}
            colour={selected ? colors.border : colors.foreground}
        >
            {props.children}
        </Main>
    );
};

export default PickableOption;
