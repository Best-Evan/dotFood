import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Input, Icon } from "react-native-elements";
import styled from "styled-components/native";
import TextBox from './../atoms/TextBox';
import SubmitButton from '../atoms/SubmitButton';
import AuthContext from '../../contexts/AuthContext';
import { useFetching } from './../../hooks/useFetching';
import Loader from '../atoms/Loader';
import colours from '../../theme/Palette';
import { useTheme } from "@react-navigation/native";

const MainCont = styled.View`
    border-radius: 40px;
`;

const Container = styled.View`
    padding: 20px;
    background-color: ${colours.auth_background};
    border-radius: 40px;
`;

const InputCont = styled.View`
    margin: 0 auto;
    display: flex;
    flex-direction: row;
`;

const Footer = styled.View`
    
    width: 100%;
    align-items: center;
`;

const FooterText = styled(TextBox)`
    text-align: center;
    color: white;
    text-decoration-line: underline;
`;



const RegisterForm = ({ rotate }) => {
    const { authFunctions, token } = useContext(AuthContext);
    const [registerData, setRegisterData] = useState({ "username": "", "password": "", "email": "" });
    const [register, isLoading, error] = useFetching(authFunctions.signUp);
    const { colors } = useTheme();
    useEffect(() => { return () => { } })

    return (
        <MainCont style={{}}>
            <ScrollView style={{}}>
                <Container style={{ backgroundColor: colors.foreground }}>
                    <InputCont style={{ backgroundColor: colors.foreground }}>
                        <Input
                            inputStyle={{ color: "white" }}
                            inputContainerStyle={{ borderBottomColor: "white" }}
                            placeholderTextColor="#FFFFFF"
                            placeholder='Имя'
                            leftIcon={<Icon type="antdesign" name="user" color="white" />}
                            value={registerData.username}
                            onChangeText={(text) => setRegisterData({ ...registerData, "username": text })}
                            autoCapitalize='none'
                        />
                    </InputCont>
                    <InputCont style={{ backgroundColor: colors.foreground }}>
                        <Input
                            inputStyle={{ color: "white" }}
                            inputContainerStyle={{ borderBottomColor: "white" }}
                            placeholderTextColor="white"
                            placeholder='Пароль'
                            secureTextEntry={true}
                            leftIcon={<Icon type="antdesign" name="key" color="white" />}
                            value={registerData.password}
                            onChangeText={(text) => setRegisterData({ ...registerData, "password": text })}
                            autoCapitalize='none'
                        />
                    </InputCont>
                    <InputCont style={{ backgroundColor: colors.foreground }}>
                        <Input
                            inputStyle={{ color: "white" }}
                            inputContainerStyle={{ borderBottomColor: "white" }}
                            placeholderTextColor="white"
                            placeholder='Почта'
                            leftIcon={<Icon type="antdesign" name="mail" color="white" />}
                            value={registerData.email}
                            onChangeText={(text) => setRegisterData({ ...registerData, "email": text })}
                            autoCapitalize='none'
                        />
                    </InputCont>
                    <SubmitButton text={"Зарегистрироваться"} submit={() => { if (!isLoading) register(registerData) }} style={{ backgroundColor: colors.buttons }}></SubmitButton>
                    <Footer style={{}}>
                        <Pressable
                            style={{ width: "100%", padding: 10 }}
                            onPress={() => { if (!isLoading) rotate() }}
                        >
                            <FooterText style={{ color: colors.text }}>Уже с нами? Тогда вам сюда</FooterText>
                        </Pressable>
                    </Footer>
                </Container>
            </ScrollView>
            {isLoading && <View style={{ marginTop: 30 }}><Loader></Loader></View>}
        </MainCont>
    );
};

export default RegisterForm;
