import AsyncStoreManager from "./asyncStoreManager";
import GeoManager from "../axios/GeoRequests";

export default fetchShops = async (location, setShopsCoords) => {
    const shops = await AsyncStoreManager.getShops();
    setShopsCoords(await GeoManager.getShops({
        shops: Object.keys(shops),
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }));
}