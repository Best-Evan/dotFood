import * as Location from 'expo-location';

export default getLocation = async (region) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log("Permission denied");
        return;
    }
    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
    return location;
}
