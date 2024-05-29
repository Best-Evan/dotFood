import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, Pressable, View } from 'react-native';
import { Input, Icon } from "react-native-elements";
import styled from "styled-components/native";
import TextBox from './../atoms/TextBox';
import SubmitButton from '../atoms/SubmitButton';
import AuthContext from '../../contexts/AuthContext';
import { useFetching } from './../../hooks/useFetching';
import axiosConstants from '../../axios/axiosConstants';
import Loader from '../atoms/Loader';
import { useTheme } from '@react-navigation/native';

const MainCont = styled.View`    
    border-radius: 40px;
`;

const Container = styled.View`
    padding: 20px;
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

const LoginForm = ({ rotate }) => {
    const { authFunctions, token } = useContext(AuthContext);
    const [loginData, setLoginData] = useState({ "username": "", "password": "" });
    const [login, isLoading, loginError] = useFetching(authFunctions.signIn);

    useEffect(() => { return () => { } }, []);
    const [cloneIp, setIp] = useState(axiosConstants.ip);
    const { colors } = useTheme();
    return (
        <MainCont style={{ backgroundColor: colors.background }}>
            <ScrollView>
                <Container style={{ backgroundColor: colors.foreground }}>
                    <InputCont>
                        <Input
                            inputStyle={{ color: "white" }}
                            inputContainerStyle={{ borderBottomColor: "white" }}
                            placeholderTextColor="#FFFFFF"
                            placeholder='Имя'
                            leftIcon={<Icon type="antdesign" name="user" color="white" />}
                            value={loginData.username}
                            onChangeText={(text) => setLoginData({ ...loginData, "username": text })}
                            autoCapitalize='none'
                        />
                    </InputCont>
                    <InputCont>
                        <Input
                            inputStyle={{ color: "white" }}
                            inputContainerStyle={{ borderBottomColor: "white" }}
                            placeholderTextColor="#FFFFFF"
                            placeholder='Пароль'
                            secureTextEntry={true}
                            leftIcon={<Icon type="antdesign" name="key" color="white" />}
                            value={loginData.password}
                            onChangeText={(text) => setLoginData({ ...loginData, "password": text })}
                            autoCapitalize='none'
                        />
                    </InputCont>
                    <SubmitButton submit={() => { if (!isLoading) login(loginData) }} text={"Авторизироваться"} style={{ backgroundColor: colors.buttons }} ></SubmitButton>
                    <Footer>
                        <Pressable
                            style={{ width: "100%", padding: 10 }}
                            onPress={() => { if (!isLoading) rotate() }}
                        >
                            <FooterText style={{ color: colors.text }}>Первый раз? Тогда вам сюда</FooterText>
                        </Pressable>
                    </Footer>
                </Container>
            </ScrollView>
            {isLoading && <View style={{ marginTop: 30 }}><Loader></Loader></View>}
        </MainCont>
    );
};

export default LoginForm;
