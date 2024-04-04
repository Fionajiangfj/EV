/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { vehicleController } from '../controller/VehicleController';

// map imports
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

const MapViewComponent = ({ onMarkerPress, searchResultData, searchKeyword }) => {

    const [deviceLocation, setDeviceLocation] = useState(null);
    const [currRegion, setCurrRegion] = useState(null);
    const [currCoord, setCurrCoord] = useState({});
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        getCurrentLocation();

        vehicleController.fetchVehicles((error, vehicles) => {
            if (error) {
                console.error("failed fetching vehicles: ", error);
                return;
            }
            setVehicles(vehicles);
        })

        console.log(`search data:  ${searchResultData}`)
        console.log(`search data numbers:  ${searchResultData.length}`)
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

    // const snapPoints = useMemo(() => ['25%', '50%'], []);

    // a variable to programmatically access the MapView element
    const mapRef = useRef(null);

    const mapMoved = (updatedRegion) => {
        console.log(`Map moved to : ${updatedRegion.latitude} ${updatedRegion.longitude}`);
        setCurrRegion(updatedRegion);

        console.log(`search data numbers:  ${searchResultData.length}`)
    };

    useEffect(() => {
        if (searchResultData.length > 0) {
            const firstResult = searchResultData[0]; // Assuming the first result determines the region
            const newRegion = {
                latitude: firstResult.pickupLocation.lat,
                longitude: firstResult.pickupLocation.lng,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
            setCurrRegion(newRegion);
            mapRef.current.animateToRegion(newRegion, 1000); // Animate to the new region
        } else if (!searchKeyword && deviceLocation) {
            // If search keyword is empty and device location is available, move to device location
            const newRegion = {
                ...deviceLocation,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
            };
            setCurrRegion(newRegion);
            mapRef.current.animateToRegion(newRegion, 1000);
        }
    }, [searchResultData, deviceLocation]);

    // func for bottom sheet
    const markerPressed = (vehicle) => {
        console.log("Selected vehicle: ", vehicle);
        onMarkerPress(vehicle);
    };

    return (
        <View style={styles.mapContainer}>
            <Text>Your location is {JSON.stringify(deviceLocation)}</Text>
            {/* <Text>Your location is Lat: {deviceLocation.latitude}, Lng: {deviceLocation.longitude}</Text> */}

            {searchKeyword && searchKeyword.length !== 0 || searchResultData.length !== 0 ? (
                <View>
                    <Text>Number of result found: {searchResultData.length}</Text>
                    <MapView
                        style={styles.map}
                        initialRegion={currRegion}
                        onRegionChangeComplete={mapMoved}
                        ref={mapRef}
                    >
                        {searchResultData.map(vehicle => (
                            <Marker
                                key={vehicle.id}
                                coordinate={{ latitude: vehicle.pickupLocation.lat, longitude: vehicle.pickupLocation.lng }}
                                title={vehicle.name}
                                onPress={() => markerPressed(vehicle)}
                            >
                                <View style={styles.customMarker}>
                                    <Text style={styles.markerText}>${vehicle.price}</Text>
                                </View>
                            </Marker>
                        ))}

                        {deviceLocation && (
                            <Marker
                                coordinate={deviceLocation}
                                title="My Location"
                            >
                                <Icon name="map-marker" size={30} color="#3498db" />
                            </Marker>
                        )}

                    </MapView>
                </View>
            ) : (

                <MapView
                    style={styles.map}
                    initialRegion={currRegion}
                    onRegionChangeComplete={mapMoved}
                    ref={mapRef}
                >
                    {vehicles.map(vehicle => (
                        <Marker
                            key={vehicle.id}
                            coordinate={{ latitude: vehicle.pickupLocation.lat, longitude: vehicle.pickupLocation.lng }}
                            title={vehicle.name}
                            onPress={() => markerPressed(vehicle)}
                        >
                            <View style={styles.customMarker}>
                                <Text style={styles.markerText}>${vehicle.price}</Text>
                            </View>
                        </Marker>
                    ))}

                    {deviceLocation && (
                        <Marker
                            coordinate={deviceLocation}
                            title="My Location"
                        >
                            <Icon name="map-marker" size={30} color="#3498db" />
                        </Marker>
                    )}

                </MapView>

            )}

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
    customMarker: {
        backgroundColor: "#808080", // Marker background color
        paddingVertical: 5, // Vertical padding for the marker
        paddingHorizontal: 10, // Horizontal padding for the marker
        borderRadius: 5, // Marker border radius for rounded corners
        borderColor: "#fff", // Border color
        borderWidth: 1, // Border width
        alignItems: 'center', // Center the text horizontally
        justifyContent: 'center', // Center the text vertically
    },
    markerText: {
        color: "#fff", // Text color
        fontWeight: 'bold', // Bold text
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
