import { StyleSheet, Text, View, TextInput, Switch, Pressable, FlatList, Image} from 'react-native';
import {useState} from "react"

// import the db variable from firebaseConfig.js
import { db } from '../firebaseConfig';

// importing the firestore functions that you need
import { collection, addDoc } from "firebase/firestore";

const DIGIMON_DATA = [
    {
        id: 1,
        name: "Koromon",
        img: "https://digimon.shadowsmith.com/img/koromon.jpg",
        level: "In Training",
    },
    {
        id: 2,
        name: "Tsunomon",
        img: "https://digimon.shadowsmith.com/img/tsunomon.jpg",
        level: "In Training",
    },
    {
        id: 3,
        name: "Yokomon",
        img: "https://digimon.shadowsmith.com/img/yokomon.jpg",
        level: "In Training",
    },
    {
        id: 4,
        name: "Motimon",
        img: "https://digimon.shadowsmith.com/img/motimon.jpg",
        level: "In Training",
    },
    {
        id: 5,
        name: "Tanemon",
        img: "https://digimon.shadowsmith.com/img/tanemon.jpg",
        level: "In Training",
    },
];


export default function RentalListScreen() {

    // 3. OPTIONAL: for more complex row layouts
    // a. Create a function to render the row layout
    // b. Create a separate component for the row layout

    return (
        <View style={styles.container}>
            <Text>
                Here is the list demo screen
            </Text>
            <FlatList
                data={DIGIMON_DATA}
                renderItem={
                    (rowData)=> {                    
                        console.log(`+++Drawing row.....`)
                        console.log(rowData)
                       // describe the UI for each row 
                       // inside this function 
                       return (
                            <View style={{flexDirection:"row", alignItems:"center"}}>
                                <Image
                                    source={{uri: rowData.item.img}}
                                    style={{height:75, width:75}}
                                />
                                <View style={{marginLeft:20}}>
                                    <Text style={{fontWeight:"bold", fontSize:18}}>{rowData.item.name}</Text>
                                    <Text>{rowData.item.level}</Text>
                                </View>                                
                            </View>
                       )
                    }
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',        
    },
});
