import React from 'react';
import { useState, useEffect } from 'react';
import TextBox from './../atoms/TextBox';
import styled from "styled-components/native";
import { Image, Pressable } from 'react-native';
import AsyncStoreManager from '../../utils/asyncStoreManager';
import { Icon } from 'react-native-elements';
import Palette from "../../theme/Palette";
import { useTheme } from '@react-navigation/native';

const Container = styled.View`
    width: 90%;
    margin: 5px auto;
    min-height: 200px;
    border-radius: 30px;
    overflow: hidden;
`;

const ImageCont = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: white;
`;

const InfoCont = styled.View`
    width: 100%;
    padding: 10px 10px 10px 10px;
`;

const Footer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    align-items: center;
    padding: 5px;
`;


const ProductCard = ({ info, ...props }) => {
    useEffect(() => { return () => { } });
    const [imgUrl, setImgUrl] = useState(info.img_url);
    const [counter, setCounter] = useState(info.amount);
    const [imgHeight, setHeight] = useState(3);
    const [imgWidth, setWidth] = useState(4);
    const { colors } = useTheme();
    useEffect(async () => {
        setImgUrl(info.img_url);
        Image.getSize(info.img_url, (srcWidth, srcHeight) => { setHeight(srcHeight); setWidth(srcWidth); },
            () => { setImgUrl("https://cdn.boldomatic.com/content/post/hRKlag/Sorry-I-m-loading-please-wait-a-moment?size=800") });
    }, [info])
    useEffect(() => {
        AsyncStoreManager.changeProductAmount(info, counter);
    }, [counter])

    function openModal() {
        props.setInfo(info);
        props.setModalVisible(true);
    }
    return (
        <Container style={{ backgroundColor: colors.foreground }}>
            <ImageCont>
                <Image
                    source={{ uri: imgUrl }}
                    style={{ width: undefined, height: 200, aspectRatio: imgWidth / imgHeight }}
                />
            </ImageCont>
            <InfoCont style={{ backgroundColor: colors.foreground }}>
                <TextBox style={{ fontSize: 20, color: colors.text }}>{info.name}</TextBox>
                <TextBox style={{ color: colors.text }}>Магазин: {info.shop_name}</TextBox>
                <Footer>
                    <TextBox style={{ color: colors.text, fontSize: 20 }}>{info.price} ₽</TextBox>
                    <Pressable style={{ backgroundColor: Palette.light_green, padding: 10, borderRadius: 10 }} onPress={() => { openModal() }}>
                        <Icon type="antdesign" name="shoppingcart" size={20} color={Palette.background}></Icon>
                    </Pressable>
                </Footer>
            </InfoCont>
        </Container>
    );
};

const arePropsEqual = (prevProps, nextProps) => {
    return prevProps.info === nextProps.info;
}

export default React.memo(ProductCard, arePropsEqual);
