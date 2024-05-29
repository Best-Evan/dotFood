import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components/native";
import TextBox from '../atoms/TextBox';
import Constants from 'expo-constants';
import DropDownPicker from 'react-native-dropdown-picker'
import { StyleSheet } from 'react-native';

const Main = styled.View`
    width: 90%;
    background-color: red;
`;

const SortFilter = () => {
    const [selectedSort, setSort] = useState(); // это пока красить не надо
    return (
        <>
            <TextBox style={{ alignSelf: "center" }}>Выбрать сортировку</TextBox>
            <View>
                <DropDownPicker
                    items={[
                        { label: 'Цена', value: 'price' },
                        { label: 'Скидка', value: 'discount' }
                    ]}
                    defaultIndex={0}
                    containerStyle={{ height: 40 }}
                    onChangeItem={item => setSort(item)}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: "red"
    },
});

export default SortFilter;