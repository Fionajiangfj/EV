import { ScrollView, View, Pressable, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
// import MapView, {Marker} from 'react-native-maps';

const MapViewComponent = () => {

    const [deviceLocation, setDeviceLocation] = useState(null);

    const getCurrentLocation = async () => {
        try {
            // get permissions
            Location.requestForegroundPermissionsAsync()
            .then((result) => {
                console.log(`Result from permission request: ${result.status}`);

                if (result.status === "granted") {
                    console.log(`Location permission granted`);

                    //get device location
                    return Location.getCurrentPositionAsync();
                } else {
                    console.log(`Location permission DENIED`);
                    throw new Error(`User did not grant location permission`);
                }
            })

            // if permission granted, then get the location
            .then((location) => {
                console.log(`Location: ${JSON.stringify(location)}`);
                console.log(`Lat: ${location.coords.latitude}`);
                console.log(`Lng: ${location.coords.longitude}`);

                // 3. do something with the retreived location
                const coords = {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                };

                setDeviceLocation(coords);
            }) 
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCurrentLocation()
    }, [])

    return (
        <View style={styles.mapContainer}>
            {/* Getting Current location */}
            {/* <Pressable style={styles.btn} onPress={getCurrentLocation}>
                <Text style={styles.btnLabel}>Get Current Location</Text>
            </Pressable> */}
            <Text>Your location is {JSON.stringify(deviceLocation)}</Text>

            {deviceLocation !== null && (
                <View style={{ marginVertical: 10 }}>
                    <Text>
                        Device latitude:
                        <Text style={{ color: "blue" }}> {deviceLocation.latitude}</Text>
                    </Text>
                    <Text>
                        Device longitude:
                        <Text style={{ color: "blue" }}> {deviceLocation.longitude}</Text>
                    </Text>
                </View>
            )}

        </View>
    );
    
 

}

export default MapViewComponent;

const styles = StyleSheet.create({
    mapContainer: {
        backgroundColor: "#fff",
        padding: 20,
    },
    btn: {
        borderWidth: 1,
        borderColor: "#141D21",
        borderRadius: 8,
        paddingVertical: 16,
        marginVertical: 10,
    },
    btnLabel: {
        fontSize: 16,
        textAlign: "center",
    },
});
