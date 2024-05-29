import React, { useContext, useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, SafeAreaView, Pressable, Animated } from 'react-native';
import styled from 'styled-components/native';
import TextBox from '../../src/atoms/TextBox';
import { Icon } from "react-native-elements";
import AuthContext from './../../contexts/AuthContext';
import { GradientHelper } from '../../src/atoms/LinearHelper';
import { ButtonGroup } from 'react-native-elements';
import specialTheme from './../../theme/specialTheme';
import darkTheme from './../../theme/darkTheme';
import lightTheme from './../../theme/lightTheme';
import { useTheme } from '@react-navigation/native';
import { useFetching } from './../../hooks/useFetching';
import AuthManager from './../../axios/Auth';
import Loader from './../../src/atoms/Loader';

const InfoCont = styled.View`
    width: 95%;
    margin: 0 auto;
    flex-direction: row;
`

const UserCont = styled.View`
    justify-content: center;
    padding-left: 20px;
`

const Footer = styled.View`
    width: 100%;
    margin: 0 auto;
    padding: 5px;
`;

const Container = styled.View`
    min-height: 100%;
    position: relative;
`;

const Header = styled.View`
    height: 5%;
    width: 100%;
`;

const Back_but_v = styled.View`
    height: 100%;
    width: 12%;
    top: 16%;
`;
const Quit_but_v = styled.View`
    top: -84%; 
    height: 100%;
    width: 12%;
    left: 88%;
`;


const ProfileScreen = ({ navigation }) => {
    const AnimatedGradientHelper = Animated.createAnimatedComponent(GradientHelper);
    const { authFunctions, authState, setTheme } = useContext(AuthContext);
    const theme = useTheme();
    const colorValue = useRef(new Animated.Value(0)).current;

    const [fetchUserData, isUserDataLoading, userDataError] = useFetching(AuthManager.getMe);
    const [userData, setUserData] = useState({ login: "", email: "", id: NaN });
    useEffect(() => {
        fetchUserData(setUserData, authState);
        if (theme == lightTheme)
            changeColor(1);
        else if (theme == darkTheme)
            changeColor(0);
        else
            changeColor(2);
    }, [])
    const color1 = colorValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [darkTheme.colors.top_gradient, lightTheme.colors.top_gradient, specialTheme.colors.top_gradient]
    });
    const color2 = colorValue.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [darkTheme.colors.bottom_gradient, lightTheme.colors.bottom_gradient, specialTheme.colors.bottom_gradient]
    });
    const changeColor = (index) => {
        Animated.timing(colorValue, {
            toValue: index,
            duration: 1500,
            useNativeDriver: false
        }).start()
        setSelectedIndex(index);
        if (index == 0)
            setTheme(darkTheme);
        else if (index == 1)
            setTheme(lightTheme);
        else
            setTheme(specialTheme);
    }

    const [selectedIndex, setSelectedIndex] = useState();
    return (
        <View style={{ flex: 1 }}>
            <AnimatedGradientHelper
                color1={color1}
                color2={color2}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, zIndex: 10 }}>
                    <SafeAreaView>
                        <Header>
                            <Back_but_v>
                                <Pressable onPress={() => navigation.goBack()}>
                                    <Icon name={"arrow-back"} />
                                </Pressable>
                            </Back_but_v>
                            <Quit_but_v>
                                <Pressable onPress={() => authFunctions.signOut()}>
                                    <Icon name={"logout"} />
                                </Pressable>
                            </Quit_but_v>

                        </Header>
                        <Container>
                            <InfoCont>
                                <Image
                                    style={{ width: "25%", height: undefined, aspectRatio: 1 / 1, borderRadius: 100 }}
                                    source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkRofqU6AVyApmfJyjKtGKBo_1HWJIH8WNBu6dnaFTikAAWzXWQFpSnEbMGIVa10z0Is&usqp=CAU" }}
                                />
                                <UserCont>
                                    {!isUserDataLoading
                                        ?
                                        <>
                                            <TextBox style={{ fontSize: 25 }}>
                                                {userData.login}
                                            </TextBox>
                                            <TextBox style={{ fontSize: 18 }}>
                                                {userData.email}
                                            </TextBox>
                                        </>
                                        :
                                        <Loader></Loader>
                                    }
                                </UserCont>
                            </InfoCont>
                            <View style={{ height: 10 }} />
                            <TextBox style={{ fontSize: 20, alignSelf: "center" }}>Выбор цветовой темы</TextBox>
                            <ButtonGroup
                                onPress={(index) => { changeColor(index) }}
                                selectedIndex={selectedIndex}
                                buttons={["Темная", "Светлая", "Экзотика"]}
                                containerStyle={{ height: 30 }}
                            />
                        </Container>
                    </SafeAreaView>
                </ScrollView>
                <Footer>
                    <TextBox style={{ color: theme.colors.text, alignSelf: "center" }}>made by: dotfood team</TextBox>
                </Footer>
            </AnimatedGradientHelper>
        </View>
    );
}

export default ProfileScreen;
