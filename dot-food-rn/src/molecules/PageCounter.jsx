import React from 'react';
import styled from "styled-components/native";
import Palette from "../../theme/Palette";
import { Pressable } from "react-native";
import { Icon } from "react-native-elements";
import {useTheme} from "@react-navigation/native";

const Button_text = styled.Text`
    color: white;
    font-size: 30px;
    align-items: center;
    text-align: center;
    justify-content: center;
`

const Switch_but = styled.View`
    width: 20%;
    left: 3%;
    height: 100%;
    flex-direction: row;
    align-items: center;
`
const Counter_text = styled.View`
    width: 55%;
    height: 100%;
    flex-direction: row;
    align-items: center;
    color: black;
    text-align: center;
    justify-content: center;
`

const Counter_container = styled.View`
    background-color: ${Palette.blue_grey};
    border-radius: 20px;
    width: 40%;
    flex-direction: row;
    align-items: center;
    color: black;
    margin: 20px auto;
`

const Counter_t = (props) => {
    const { colors } = useTheme();
    return (
    <Counter_container style = {{backgroundColor: colors.buttons}}>
      <Switch_but>
        <Pressable onPress={() => { props.back() }}>
          <Icon type="antdesign" name={"left"} color="white" size={29} />
        </Pressable>
      </Switch_but>
      <Counter_text>
        <Button_text>
          {props.text + 1}
        </Button_text>
      </Counter_text>
      <Switch_but>
        <Pressable onPress={() => { props.next() }}>
          <Icon type="antdesign" name={"right"} color="white" size={29} />
        </Pressable>
      </Switch_but>
    </Counter_container>
    );
};

export default Counter_t;
