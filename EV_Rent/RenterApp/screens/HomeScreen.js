import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatList, TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

// components
import BottomSheet from "../Components/BottomSheet";
import MapViewComponent from "../Components/MapView";
import { vehicleController } from '../controller/VehicleController';


const HomeScreen = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    // const [mapMarker, setMapMarker] = useState('')
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const [searchResult, setSearchResult] = useState([]);

    const handleOpenBottomSheet = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };

    const handleSearch = (searchKeyword) => {


        // Update the searchKeyword state
        setSearchKeyword(searchKeyword);

        console.log(`Keyword: ${searchKeyword}`)

        // Filering vehicles based on their address
        if (searchKeyword.trim() !== '') {
            vehicleController.filterVehiclesByAddress(searchKeyword).then(vehicles => {
                setSearchResult(vehicles);

                console.log(`result: ${searchResult}`)
                console.log(vehicles)
            }).catch(error => {
                console.error("Failed fetching results: ", error);
                // You might want to set an error state or display a message to the user here
            });
        } else {
            // Clear search results when searchKeyword is empty
            setSearchResult([]);
        }
    };

    const handleonMarkerPress = (vehicle) => {
        setSelectedVehicle(vehicle)
        handleOpenBottomSheet()
    }

    useEffect(() => {
        handleSearch(searchKeyword);
    }, [searchKeyword]);



    return (
        <View style={styles.container}>
            <Text style={styles.header}>HomeScreen</Text>

            {/* SearchBar */}
            {/* <TextInput placeholder="Search here..." onChangeText={setSearchKeyword} value={searchKeyword} autoCorrect={false} style={styles.searchbar} /> */}

            <View style={styles.searchbar}>
                <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
                <TextInput
                    placeholder="Search here..."
                    onChangeText={handleSearch}
                    value={searchKeyword}
                    autoCorrect={false}
                    style={styles.searchText}
                />
            </View>

            <FlatList
                data={searchResult}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Text style={styles.listTitle}>{item.vehicleName}</Text>
                        <Text>{`Capacity: ${item.capacity}`}</Text>
                        <Text>{`Fuel Type: ${item.fuel}`}</Text>
                        <Text>{`License Plate: ${item.licensePlate}`}</Text>
                        <Text>Address: {item.pickupLocation.address}</Text>
                        {/* Add more details as needed */}
                    </View>
                )}
            />

            {/* Mapview */}
            <MapViewComponent onMarkerPress={handleonMarkerPress} searchResultData={searchResult}/>

            <BottomSheet isVisible={isBottomSheetVisible} onClose={handleCloseBottomSheet} vehicle={selectedVehicle} />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    buttonBg: {
        fontSize: 20,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 18,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        height: 40,
        margin: 10,
        borderTopLeftRadius: 10,
        borderBottomLefttRadius: 10,
    },
    searchIcon: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 10,

    },
    searchText: {
        backgroundColor: '#fff',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        padding: 5,
        flex: 1,
    },

    listItem: {
        flexDirection: 'column',
        alignItems: 'left',
    },

    listTitle: {
        fontSize: 20,
        textAlign: 'left',
        paddingVertical: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    listImage: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        paddingBottom: 10,
    },
    listBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    listPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0064B1',
        paddingBottom: 8,
    },
    listAddress: {
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
        paddingBottom: 8,
    }
})