import { ScrollView, View, Pressable, Text, StyleSheet, Dimensions, Button } from "react-native";
import { useState, useEffect, useRef } from "react";
import Icon from 'react-native-vector-icons/FontAwesome5';

// map imports
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const MapViewComponent = () => {

    const [deviceLocation, setDeviceLocation] = useState(null);
    const [currRegion, setCurrRegion] = useState(null);
    const [currCoord, setCurrCoord] = useState({});


    // Function to fetch current location and set it as initial region
    const getCurrentLocation = async () => {
        try {
            // Get permissions
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                console.log("Location permission denied");
                return;
            }

            // Get device location
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // Set device location
            const coords = { latitude, longitude };
            setDeviceLocation(coords);

            // Set initial region to device location
            const region = {
                latitude,
                longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            };
            setCurrRegion(region);
            setCurrCoord(coords);
        } catch (error) {
            console.error("Error getting current location:", error);
        }
    };

    // a variable to programmatically access the MapView element
    const mapRef = useRef(null);

    const mapMoved = (updatedRegion) => {
        console.log(`Map moved to : ${updatedRegion.latitude} ${updatedRegion.longitude}`);
        setCurrRegion(updatedRegion);
    };

    // const moveToDeviceLocation = () => {
    //     mapRef.current.animateCamera({ center: deviceLocation }, 2000);
    // };

    useEffect(() => {
        getCurrentLocation();
    }, []);

    // func for bottom sheet
    const tap = () => {
        console.log('Marker Pressed!')
    }

    return (
        <View style={styles.mapContainer}>
            <Text>Your location is {JSON.stringify(deviceLocation)}</Text>

            <MapView
                style={styles.map}
                initialRegion={currRegion}
                onRegionChangeComplete={mapMoved}
                ref={mapRef}
            >
                <Marker
                    coordinate={currCoord}
                    title="1 Main Street, Toronto"
                    description="Center of Toronto"
                >
                    {/* <Icon name="map-marker-alt" size={28} color='#0064B1' /> */}
                    <Pressable style={styles.btn} onPress={tap}>
                        <Text style={styles.marker}>$100</Text>
                    </Pressable>
                </Marker>
            </MapView>

        </View>
    );
};

export default MapViewComponent;

const styles = StyleSheet.create({
    mapContainer: {
        backgroundColor: "#fff",
        padding: 10,
    },
    map: {
        height: "85%",
        width: "100%",
        marginTop: 5,
    },
    marker: {
        backgroundColor: "#fff",
    },
    btn: {
        borderWidth: 1,
        borderColor: "#fff",
        borderRadius: 15,
        padding: 8,
        backgroundColor: "#fff",
    },
    btnLabel: {
        fontSize: 16,
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
});
