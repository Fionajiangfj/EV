import React, { useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { VehicleController } from '../controller/VehicleController';
// map imports
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
const MapViewComponent = () => {

    const [deviceLocation, setDeviceLocation] = useState(null);
    const [currRegion, setCurrRegion] = useState(null);
    const [currCoord, setCurrCoord] = useState({});
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const bottomSheetRef = useRef(null);
    useEffect(() => {
        async function fetchVehicles() {
            const vehicles = await VehicleController.fetchVehicles();
            console.log(vehicles);
            setVehicles(vehicles);

        }

        fetchVehicles();
    }, []);
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

    const snapPoints = useMemo(() => ['25%', '50%'], []);

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
    const onMarkerPress = (vehicle) => {
        setSelectedVehicle(vehicle);
        bottomSheetRef.current?.expand();
    };

    return (
        <View style={styles.mapContainer}>
            <Text>Your location is {JSON.stringify(deviceLocation)}</Text>

            <MapView
                style={styles.map}
                initialRegion={currRegion}
                onRegionChangeComplete={mapMoved}
                ref={mapRef}
            >
                {vehicles.map(vehicle => (
                    <Marker
                        key={vehicle.id}
                        coordinate={{ latitude: vehicle.latitude, longitude: vehicle.longitude }}
                        title={vehicle.name}
                        onPress={() => onMarkerPress(vehicle)}
                    >
                        <Text>Hii</Text>
                    </Marker>
                ))}
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
        marginTop: 15,
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
