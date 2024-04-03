import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchBar } from "react-native-elements";

// components
import BottomSheet from "../Components/BottomSheet";
import MapViewComponent from "../Components/MapView";

const HomeScreen = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [selectedVehicle, setSelectedVehicle] = useState(null) 
    // const [mapMarker, setMapMarker] = useState('')
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const handleOpenBottomSheet = () => {
        setIsBottomSheetVisible(true);
    };

    const handleCloseBottomSheet = () => {
        setIsBottomSheetVisible(false);
    };
    const handleSearch = (text) => {
        setSearchKeyword(text);
        // Implement your search logic here
    };

    const handleonMarkerPress = (vehicle) => {
        setSelectedVehicle(vehicle)
        handleOpenBottomSheet()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>HomeScreen</Text>
            
            {/* SearchBar */}
            <SearchBar placeholder="Search here..." onChangeText={setSearchKeyword} value={searchKeyword} autoCorrect={false} lightTheme round 
            containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
            inputContainerStyle={{ backgroundColor: '#e8e8e8', borderRadius: 20 }}
            inputStyle={{ color: 'black' }}/> 
            
            {/* Mapview */}
            <MapViewComponent onMarkerPress={handleonMarkerPress}/>

            <BottomSheet isVisible={isBottomSheetVisible} onClose={handleCloseBottomSheet} vehicle={selectedVehicle}/>
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
        backgroundColor: '#fff',
        margin: 0,
        
    }
})