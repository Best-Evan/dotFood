import React from 'react';
import { useState, useEffect } from 'react';
import TextBox from './../atoms/TextBox';
import styled from "styled-components/native";
import { ImageBackground, Image, Text, Pressable } from 'react-native';
import CardCounter from './CardCounter';
import AsyncStoreManager from '../../utils/asyncStoreManager';
import { View } from 'react-native';
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
    justify-content: center;
    align-items: center;
    background-color: white;
`;

const InfoCont = styled.View`
    width: 100%;
    padding: 10px 10px 10px 10px;
`;

const Footer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;
    align-items: center;
    
`;


const Header = styled.View`
    width: 90%;
`;


const CartProductCard = ({ info, setProductsInfo, productsInfo, ...props }) => {
    const [imgUrl, setImgUrl] = useState(info.img_url);
    const [counter, setCounter] = useState(info.amount);
    const [imgHeight, setHeight] = useState(3);
    const [imgWidth, setWidth] = useState(4);
    const { colors } = useTheme();

    const updateCounter = (newCounter) => {
        setProductsInfo({
            cost: productsInfo.cost + info.price * (newCounter - counter),
            amount: productsInfo.amount - counter + newCounter
        })
        setCounter(newCounter);
    }

    useEffect(() => {
        setCounter(info.amount)
    }, [info.amount])
    Image.getSize(info.img_url, (srcWidth, srcHeight) => { setHeight(srcHeight); setWidth(srcWidth); },
        () => { setImgUrl("https://i.ytimg.com/vi/QgTtVSysfic/hqdefault.jpg"); });
    useEffect(() => {
        AsyncStoreManager.changeProductAmount(info, counter);
    }, [counter])

    return (
        <>
            {
                counter != 0
                    ?
                    <Container style = {{backgroundColor: colors.foreground}}>
                        <ImageCont>
                            <Image
                                source={{ uri: imgUrl }}
                                style={{ width: undefined, height: 200, aspectRatio: imgWidth / imgHeight }}
                            />
                        </ImageCont >
                        <InfoCont style = {colors.foreground}>
                            <TextBox style={{ color: colors.text, fontSize: 20 }}>{info.name}</TextBox>
                            <TextBox style = {{color: colors.text}}>Магазин: {info.shop_name}</TextBox>
                            <Footer>
                                <TextBox style={{ color: colors.text, fontSize: 20 }}>{(info.price * counter).toFixed(2)} ₽</TextBox>
                                <CardCounter zeroMin counter={counter} setCounter={updateCounter}></CardCounter>
                            </Footer>
                        </InfoCont>
                    </Container >
                    :
                    <></>
            }
        </>
    );
};

export default CartProductCard;
