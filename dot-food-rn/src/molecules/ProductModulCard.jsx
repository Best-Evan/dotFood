import React, { useState, useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, Button } from "react-native";
import styled from "styled-components/native";
import CardCounter from './CardCounter';
import Palette from "../../theme/Palette";
import TextBox from './../atoms/TextBox';
import AsyncStoreManager from "../../utils/asyncStoreManager";
import { useTheme } from '@react-navigation/native';

const Container = styled.View`
    width: 90%;    
    background-color: ${Palette.modal_background};
    border-radius: 30px;
    overflow: hidden;
`;

const InfoCont = styled.View`
    width: 100%;
    padding: 10px 10px 10px 10px;
`;

const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;
    align-items: center;
    padding: 10px 0 0 0;
`;


const But_cont = styled.View`
    flex-direction: row;
    margin: 10px;
`;

const Button_cancel = styled.Pressable`
    width: 40%;
    height: 90%;
    border-radius: 10px;
    background-color: ${Palette.dark_red};
    margin: 5px auto;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

const Button_accept = styled.Pressable`
    width: 40%;
    height: 90%;
    border-radius: 10px;
    background-color: ${Palette.light_green};
    margin: 5px auto;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

const Centred = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ModalCard = (props) => {
    const [counter, setCounter] = useState(1);
    const { colors } = useTheme();
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalVisible}
            >
                <Centred>
                    <Container style={{ backgroundColor: colors.minor_details }}>
                        <InfoCont>
                            <TextBox style={{ color: colors.text, fontSize: 20 }}>{props.info.name}</TextBox>
                            <TextBox style = {{color: colors.text}}>Магазин: {props.info.shop_name}</TextBox>
                            <Footer>
                                <CardCounter counter={counter} setCounter={setCounter}> </CardCounter>
                                <TextBox style={{ fontSize: 24 }}>{(props.info.price * counter).toFixed(2)} ₽</TextBox>
                            </Footer>
                        </InfoCont>
                        <But_cont>
                            <Button_cancel style={{ backgroundColor: colors.cancel_button }} onPress={() => { setCounter(1); props.setModalVisible(!props.modalVisible); }}>
                                <TextBox style={{ fontSize: 20 }}>Отмена</TextBox>
                            </Button_cancel>
                            <Button_accept style={{ backgroundColor: colors.accept_button }} onPress={() => { setCounter(1); AsyncStoreManager.addProductAmount(props.info, counter); props.setModalVisible(false) }}>
                                <TextBox style={{ fontSize: 20 }}>Добавить</TextBox>
                            </Button_accept>
                        </But_cont>
                    </Container>
                </Centred>
            </Modal>
        </View >
    );
};

export default ModalCard;
