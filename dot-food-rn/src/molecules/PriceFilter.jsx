import React, { useState } from 'react';
import styled from "styled-components/native";
import { Slider } from '@miblanchard/react-native-slider';
import { TextInput } from 'react-native';
import colours from '../../theme/Palette';
import { useTheme } from '@react-navigation/native';

const PriceCont = styled.View`
    width: 80%;
    margin: 0 auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const PriceField = styled.View`
    width: 30%;
    height: 100%;
    border-radius: 5px;
    align-items: center;
    height: 50px;
    border: 2px solid;
`;

const SliderCont = styled.View`
    width: 80%;
    margin: 0 auto;
`;

const PriceFilter = ({ minValue, maxValue, setMinValue, setMaxValue }) => {
    const [minBorder, maxBorder] = [0, 6000];
    const delta = 500;
    const [sliderValue, setSliderValue] = useState([minValue, maxValue]);
    const { colors } = useTheme();

    const filterMinPrice = () => {
        let correctPrice = minValue.replace(/[^0-9]/g, ''); // оставляем только цифры
        correctPrice = Math.min(Number(correctPrice), Number(maxValue) - delta); // смотрим пересечение с макс границей
        correctPrice = Math.max(correctPrice, minBorder); // смотрим пересечение с мин допустимым значением
        setMinValue(correctPrice.toString());
        setSliderValue([correctPrice, sliderValue[1]])
    }

    const filterMaxPrice = () => {
        let correctPrice = maxValue.replace(/[^0-9]/g, ''); // оставляем только цифры
        correctPrice = Math.max(Number(correctPrice), Number(minValue) + delta); // смотрим пересечение с мин границей
        correctPrice = Math.min(correctPrice, maxBorder); // смотрим пересечение с максдопустимым значением
        setMaxValue(correctPrice.toString());
        setSliderValue([sliderValue[0], correctPrice])
    }

    const [sliderMoveInfo, setSliderMoveInfo] = useState(['left', false]);

    const handleSlider = (borders) => {
        setMinValue(parseInt(borders[0]).toString());
        setMaxValue(parseInt(borders[1]).toString());
        if (!sliderMoveInfo[1]) {
            if (borders[0] != sliderValue[0]) {
                setSliderMoveInfo(['left', true]);
            }
            else {
                setSliderMoveInfo(['right', true]);
            }
        }
        setSliderValue(borders);
    }

    const correctBordersDelta = (borders) => {
        if (borders[1] - borders[0] < delta) {
            let correctBorders;
            if (sliderMoveInfo[0] == 'left')
                correctBorders = [borders[1] - delta, borders[1]];
            else {
                correctBorders = [borders[0], borders[0] + delta];
            }
            setSliderValue(correctBorders);
            setMinValue(correctBorders[0].toString());
            setMaxValue(correctBorders[1].toString());
        }
        setSliderMoveInfo(['', false]);
    }

    return (
        <>
            <SliderCont>
                <Slider
                    step={150}
                    minimumValue={minBorder}
                    maximumValue={maxBorder}
                    value={sliderValue}
                    onValueChange={handleSlider}
                    thumbStyle={{ backgroundColor: colors.minor_details, borderWidth: 2, borderColor: colors.border }}
                    trackStyle={{ backgroundColor: colours.grey }}
                    thumbTintColor={"#340000"}
                    onSlidingComplete={correctBordersDelta}
                    minimumTrackTintColor={colours.grey}
                    trackClickable={false}
                />
            </SliderCont>
            <PriceCont style={{ backgroundColor: colors.foreground }}>
                <PriceField style={{ backgroundColor: colors.minor_details }}>
                    <TextInput
                        textAlign='center'
                        maxLength={7}
                        keyboardType='numeric'
                        value={minValue}
                        onChangeText={setMinValue}
                        onBlur={filterMinPrice}
                        style={{ width: "100%", height: "100%", color: colors.text }}
                    />
                </PriceField>
                <PriceField style={{ backgroundColor: colors.minor_details }}>
                    <TextInput
                        maxLength={7}
                        textAlign='center'
                        keyboardType='numeric'
                        value={maxValue}
                        onChangeText={setMaxValue}
                        onSubmitEditing={filterMaxPrice}
                        onBlur={filterMaxPrice}
                        style={{ width: "100%", height: "100%", color: colors.text }}
                    />
                </PriceField>
            </PriceCont>
        </>
    );
};

export default PriceFilter;
