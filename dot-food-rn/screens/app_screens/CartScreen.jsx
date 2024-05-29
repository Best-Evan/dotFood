import React, { useState, useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import AsyncStoreManager from '../../utils/asyncStoreManager';
import { FlatList } from 'react-native';
import CartProductCard from './../../src/molecules/CartProductCard';
import TextBox from '../../src/atoms/TextBox';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from '@react-navigation/native';

const CartScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    const { colors } = useTheme();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let resp = await AsyncStoreManager.getProducts();
            resp = resp ? JSON.parse(resp) : [];
            setProducts(resp);
        });
        return unsubscribe;
    }, [navigation])

    const [productsInfo, setProductsInfo] = useState({ cost: 0, amount: 0 })

    useEffect(() => {
        let cost = 0, amount = 0;
        for (let product of products) {
            cost += product.price * product.amount;
            amount += product.amount;
        }
        setProductsInfo({ cost: cost, amount: amount });
    }, [products])

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: "white" }}>
            <LinearGradient colors={[colors.top_gradient, colors.bottom_gradient]} style={{ flex: 1 }}>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <TextBox style={{ color: "black", textAlign: "center", fontSize: 20 }}>Сумма: {productsInfo.cost.toFixed(2)}</TextBox>
                            <TextBox style={{ color: "black", textAlign: "center", fontSize: 20 }}>Количество продуктов: {productsInfo.amount}</TextBox>
                        </>
                    }
                    data={products}
                    renderItem={({ item }) => <CartProductCard
                        productsInfo={productsInfo}
                        setProductsInfo={setProductsInfo}
                        info={item}
                    />}
                    keyExtractor={(product) => product.id}
                />
            </LinearGradient>
        </View>
    );
};

export default CartScreen;