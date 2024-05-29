import React, { useEffect, useState, useRef } from 'react';
import MapView from 'react-native-maps';
import { Image, Pressable, Animated } from 'react-native';
import { View } from 'react-native';
import styled from "styled-components/native";
import { Marker } from 'react-native-maps';
import { useFetching } from './../../hooks/useFetching';
import getLocation from './../../utils/getLocation';
import fetchShops from '../../utils/fetchShops';
import ShopsScrollView from '../../src/molecules/ShopsScrollView';
import TextBox from '../../src/atoms/TextBox';
import { useTheme } from '@react-navigation/native';

const ProfileButton = styled.View`
    position: absolute;
    top: 30px;
    width: 17%;
    z-index: 10;
    left: 5%;
`;

const MapScreen = ({ navigation }) => {
    const [region, setRegion] = useState({
        latitude: 55.67024165484449,
        longitude: 37.56968080680975,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
    });

    const theme = useTheme();

    const [shopsCoords, setShopsCoords] = useState({});
    const [getShops, isShopsLoading, shopsError] = useFetching(fetchShops);
    const animation = useRef(new Animated.Value(0)).current;
    const scrollRef = useRef(null);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            let location = await getLocation(region);
            await getShops(location, setShopsCoords);
            scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
        });
        return () => {
            unsubscribe();
        }
    }, [navigation]);


    const [markers, setMarkers] = useState([]);
    const markersRef = useRef();
    markersRef.current = markers;
    const [interpolatedMarkers, setInterpolatedMarkers] = useState();
    const CARD_WIDTH = 300;
    const map = useRef(null);
    const [markerSize, setMarkerSize] = useState(10);

    useEffect(() => {
        let shownIndex = 0;
        let regionTimeout;
        animation.addListener(({ value }) => {
            let calcIndex = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
            calcIndex = Math.min(calcIndex, markersRef.current.length - 1);
            calcIndex = Math.max(calcIndex, 0);
            clearTimeout(regionTimeout);
            regionTimeout = setTimeout(() => {
                if (shownIndex !== calcIndex) {
                    shownIndex = calcIndex;
                    let { x, y } = markersRef.current[shownIndex];
                    map.current.animateToRegion(
                        {
                            latitude: y,
                            longitude: x,
                            latitudeDelta: 0.002,
                            longitudeDelta: 0.002,
                        },
                        500
                    );
                }
            }, 300, calcIndex);
        })
    }, []);
    useEffect(() => {
        const newMarkers = [];
        for (let shop of Object.keys(shopsCoords)) {
            newMarkers.push({ ...shopsCoords[shop][0], key: shop, size: markerSize });
        }
                     
        setInterpolatedMarkers(newMarkers.map((marker, index) => {
            const inputRange = [
                (index - 1) * CARD_WIDTH,
                index * CARD_WIDTH,
                (index + 1) * CARD_WIDTH,
            ];
            const scale = animation.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0.9],
                extrapolate: "clamp",
            });
            const opacity = animation.interpolate({
                inputRange,
                outputRange: [1, 1, 1],
                extrapolate: "clamp",
            });
            const rotation = animation.interpolate({
                inputRange,
                outputRange: ["30deg", "0deg", "-30deg"],
                extrapolate: "clamp"
            })
            return { scale, opacity, rotation };
        }));
        setMarkers(newMarkers);
        if (newMarkers.length != 0 && JSON.stringify(newMarkers) !== JSON.stringify(markers)) {
            setRegion({ ...region, latitude: newMarkers[0].y, longitude: newMarkers[0].x });
        }
    }, [shopsCoords, markerSize])
    const shopsImages = {
        "EUROSPAR": require("../../assets/shops_icons/eurospar.png"),
        "Лента": require("../../assets/shops_icons/lenta.png"),
        "Пятерочка": require("../../assets/shops_icons/5ka.png"),
        "Ашан": require("../../assets/shops_icons/ashan.png"),
        "Fix Price": require("../../assets/shops_icons/fixprice.png"),
        "Азбука Вкуса": require("../../assets/shops_icons/av.png"),
        "Дикси": require("../../assets/shops_icons/diksi.png"),
        "Vkus Vill": require("../../assets/shops_icons/vkusvill.png")
    };
    const [listVisible, setListVisible] = useState(false);
    return (
        <View style={{ flex: 1 }}>
            <ShopsScrollView animation={animation} CARD_WIDTH={CARD_WIDTH} scrollRef={scrollRef}>
                {markers.map((shop, index) => {
                    return (
                        <Animated.View key={shop.key}
                            style={{ transform: [{ rotateY: interpolatedMarkers[index].rotation }, { scale: interpolatedMarkers[index].scale }], width: CARD_WIDTH, height: 100, backgroundColor: theme.colors.foreground, margin: 4, flexDirection: "row", padding: 10, justifyContent: "center" }}>
                            <TextBox style={{ fontSize: 30, alignSelf: "center" }}>{shop.key}</TextBox>
                        </Animated.View>
                    );
                })}
            </ShopsScrollView>
            <ProfileButton>
                <Pressable onPress={() => navigation.navigate('ProfileScreen')}>
                    <Image
                        style={{ width: "100%", height: undefined, aspectRatio: 1 / 1, borderRadius: 100 }}
                        source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFkRofqU6AVyApmfJyjKtGKBo_1HWJIH8WNBu6dnaFTikAAWzXWQFpSnEbMGIVa10z0Is&usqp=CAU" }}
                    />
                </Pressable>
            </ProfileButton>
            <MapView
                provider={MapView.PROVIDER_GOOGLE}
                showsUserLocation={true}
                image={{ uri: 'custom_pin' }}
                region={region}
                ref={map}
                style={{
                    width: "100%",
                    height: "100%"
                }}
            >
                {markers.map((shop, index) => {
                    return (
                        <Marker
                            key={shop.key}
                            coordinate={{ latitude: shop.y, longitude: shop.x }}
                            style={{ borderRadius: 50, overflow: "visible", justifyContent: "center", alignItems: "center" }}
                            tracksViewChanges={true}
                        >
                            <View style={{
                                width: 40,
                                height: 40,
                                backgroundColor: "white",
                                justifyContent: "center",
                                alignItems: "center",
                            }}>
                                <Image
                                    source={shopsImages[shop.key]}
                                    style={{ flex: 1, borderRadius: 50 }}
                                    resizeMode={"contain"}
                                />
                            </View>
                        </Marker>
                    )
                })}
            </MapView>
        </View>
    );
};

export default MapScreen;
