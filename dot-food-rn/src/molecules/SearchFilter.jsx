import React, { useState } from 'react';
import TextBox from '../atoms/TextBox';
import styled from "styled-components/native";
import PickableOption from '../atoms/PickableOption';
import PriceFilter from './PriceFilter';
import colours from '../../theme/Palette';
import { Button } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const Main = styled.View`
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 20px;
    padding: 0 0 5px 0;
`;

const ShopCont = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: 0 auto;
`;

const ArticleHeader = styled(TextBox)`
    font-size: 20px;
    text-align: center;
`;

const SearchFilter = (props) => {
    const { colors } = useTheme();
    return (
        <Main style = {{ backgroundColor: colors.foreground }}>
            <ArticleHeader style = {{color: colors.text}} >Магазины</ArticleHeader>
            <ShopCont style = {{color: colors.text}}>
                {props.shopsArr.map(shop => <PickableOption style = {{color: colors.text}} name={shop} selectedShops={props.selectedShops} setSelectedShops={props.setSelectedShops} key={shop}><TextBox style = {{color: colors.text}} >{shop}</TextBox></PickableOption>)}
            </ShopCont>
            <ArticleHeader style = {{color: colors.text}} >Цены</ArticleHeader>
            <PriceFilter minValue={props.prices.minValue} maxValue={props.prices.maxValue} setMaxValue={props.prices.setMaxValue} setMinValue={props.prices.setMinValue}></PriceFilter>
        </Main>
    );
};

export default SearchFilter;
