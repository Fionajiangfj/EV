import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

// components
import BottomSheet from "../Components/BottomSheet";
import MapViewComponent from "../Components/MapView";
import { vehicleController } from '../controller/VehicleController';


const HomeScreen = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    // For bottom sheet
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
        <View style={styles.homeContainer}>
            <Text style={styles.homeHeader}>HomeScreen</Text>

            {/* SearchBar */}
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

            {/* Mapview */}
            <MapViewComponent onMarkerPress={handleonMarkerPress} searchResultData={searchResult} searchAddress={searchKeyword}/>

            <BottomSheet isVisible={isBottomSheetVisible} onClose={handleCloseBottomSheet} vehicle={selectedVehicle} />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    homeHeader: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    
    searchbar: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        height: 40,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
    },
    searchIcon: {
        height: 40,
        borderColor: 'gray',
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

})