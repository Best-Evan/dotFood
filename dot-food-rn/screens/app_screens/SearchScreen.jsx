import React, { useContext, useState, useMemo, useRef, useEffect } from 'react';
import TextBox from '../../src/atoms/TextBox';
import ProductCard from './../../src/molecules/ProductCard';
import { View, StatusBar, Button } from 'react-native';
import SearchFilter from '../../src/molecules/SearchFilter';
import { SearchBar } from 'react-native-elements';
import ProductsManager from '../../axios/ProductsFetching';
import AuthContext from './../../contexts/AuthContext';
import { useFetching } from './../../hooks/useFetching';
import { FlatList } from 'react-native';
import Loader from '../../src/atoms/Loader';
import CryptoJS from 'crypto-js';
import Counter_t from "../../src/molecules/PageCounter";
import ModalCard from '../../src/molecules/ProductModulCard';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from '@react-navigation/native';


const SearchScreen = () => {
    const { authFunctions, authState } = useContext(AuthContext);
    const [productName, setProductName] = useState("");
    const [products, setProducts] = useState([]);
    const [getProduct, isLoading, error] = useFetching(ProductsManager.getProducts);
    const [shownPage, setPage] = useState(0);

    const shopsApiArr = {
        "EUROSPAR": "Евроспар", "Лента": "Лента", "Пятёрочка": "Пятерочка",
        "Ашан": "Ашан", "Fix Price": "FixPrice", "Азбука Вкуса": "Азбука Вкуса", "Дикси": "Дикси",
        "Vkus Vill": "Вкусвилл", "Метро": "Метро"
    }

    const shopsArr = ["Пятерочка", "Ашан", "FixPrice", "Азбука Вкуса",
        "Лента", "Дикси", "Вкусвилл", "Евроспар", "Метро"];
    const [selectedShops, setSelectedShops] = useState(() => {
        const defaultShops = {};
        for (let shop of shopsArr)
            defaultShops[shop] = true;
        return defaultShops;
    });
    const [isSorted, setIsSorted] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [modalInfo, setModalInfo] = useState({});
    const [minBorder, maxBorder] = [0, 6000];
    const [minValue, setMinValue] = useState(minBorder.toString());
    const [maxValue, setMaxValue] = useState(maxBorder.toString());

    const [renderedProducts, maxPage] = useMemo(() => {
        let renderedArr = [[]], lastIndex = 0, blockSize = 10;
        for (let shop_products of products) {
            if (Array.isArray(shop_products))
                for (let product of shop_products) {
                    if (selectedShops[shopsApiArr[product.shop_name]] && product.price >= minValue && product.price <= maxValue) {
                        if (renderedArr[lastIndex].length == blockSize) {
                            renderedArr.push([]);
                            lastIndex++;
                        }
                        renderedArr[lastIndex].push({
                            ...product,
                            shop_name: shopsApiArr[product.shop_name],
                            id: CryptoJS.MD5(product.name + product.price + product.shop_name).toString(),
                            amount: 0
                        });
                    }
                }
        }
        return [renderedArr, lastIndex];
    }, [products, selectedShops, isSorted]);

    const flatList = useRef();
    const moveToTop = () => flatList.current.scrollToIndex({ index: 0 });
    const back_func = () => { setPage(Math.max(0, shownPage - 1)); moveToTop() }
    const next_func = () => { setPage(Math.min(maxPage, shownPage + 1)); moveToTop() }

    const { colors } = useTheme();


    const [searchTimeout, setSearchTimeout] = useState(null);

    useEffect(() => {
        clearTimeout(searchTimeout);
        setPage(0);
        setProducts([]);
        setSearchTimeout(setTimeout(() => {
            if (productName != "") {
                getProduct(productName, authState, setProducts);
            }
        }, 1200));
        return () => {
            clearTimeout(searchTimeout);
        }
    }, [productName])

    const [bordersTimeout, setBordersTimeout] = useState(null);

    // useEffect(() => {
    //     clearTimeout(bordersTimeout);
    //     setBordersTimeout(setTimeout(() => {
    //         setIsSorted(!isSorted);
    //     }, 2000));
    //     return () => {
    //         clearTimeout(searchTimeout);
    //     }
    // }, [minValue, maxValue]);

    const renderItem = ({ item, index }) => {
        return <ProductCard setInfo={setModalInfo} setModalVisible={setModalVisible} info={item}></ProductCard>
    }

    return (
        <View style={{ flex: 1, paddingTop: StatusBar.currentHeight, backgroundColor: 'white' }}>
            <LinearGradient colors={[colors.top_gradient, colors.bottom_gradient]} style={{ flex: 1 }}>
                <FlatList ref={flatList}
                    ListHeaderComponent={
                        <>
                            <ModalCard info={modalInfo} setModalVisible={setModalVisible} modalVisible={modalVisible}></ModalCard>
                            <SearchBar
                                onChangeText={setProductName}
                                value={productName}
                            />
                            <SearchFilter prices={{ minValue: minValue, setMinValue: setMinValue, maxValue: maxValue, setMaxValue: setMaxValue }} shopsArr={shopsArr} selectedShops={selectedShops} setSelectedShops={setSelectedShops}></SearchFilter>
                            {!isLoading && maxPage != 0 &&
                                <Counter_t back={back_func} text={shownPage} next={next_func}></Counter_t>
                            }
                            {isLoading && <Loader></Loader>}
                            <TextBox>{error}</TextBox>
                        </>
                    }
                    data={renderedProducts[shownPage]}
                    renderItem={renderItem}
                    keyExtractor={(product, index) => index}
                    ListFooterComponent={
                        <>
                            {!isLoading && maxPage != 0 &&
                                <Counter_t back={back_func} text={shownPage} next={next_func}></Counter_t>
                            }
                        </>
                    }
                />
            </LinearGradient>
        </View>
    );
};

export default SearchScreen;
