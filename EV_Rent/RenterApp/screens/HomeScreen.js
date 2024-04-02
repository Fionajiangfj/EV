import { useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native"
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ListItem, SearchBar } from "react-native-elements"; 

// import BottomSheet from "../Components/BottomSheet";
import MapViewComponent from "../Components/MapView";

const HomeScreen = () => {
    const [searchKeyword, setSearchKeyword] = useState('')
    const [mapMarker, setMapMarker] = useState('')

    const tap = () => {
        console.log('Marker Pressed!')
    }

    const handleSearch = (text) => {
        setSearchKeyword(text);
        // Implement your search logic here
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>HomeScreen</Text>
            
            {/* SearchBar */}
            <SearchBar placeholder="Search here..." onChangeText={setSearchKeyword} value={searchKeyword} autoCorrect={false} lightTheme round 
            containerStyle={{ backgroundColor: 'transparent', borderBottomColor: 'transparent', borderTopColor: 'transparent' }}
            inputContainerStyle={{ backgroundColor: '#e8e8e8', borderRadius: 20 }}
            inputStyle={{ color: 'black' }}/> 
            
            <MapViewComponent />

            <Text>MapView</Text>

        
            {/* <Pressable onPress={tap}>
                <Icon name="map-marker-alt" size={28} color= '#0064B1' />
            </Pressable> */}
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