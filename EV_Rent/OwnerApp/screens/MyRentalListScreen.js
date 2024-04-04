import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// 1. Import the db variable from firebaseConfig
import { db } from '../firebaseConfig';

// 2. Import the relevant functions from firestore
import { collection, getDocs } from "firebase/firestore";
import ButtonComponent from "../Components/ButtonComponent";
import FlatListComponent from "../Components/FlatListComponent";


const MyRentalListScreen = ({ navigation }) => {

    // state variable
    const [myRentals, setMyRentals] = useState([])

    useEffect(() => {

        // Move all the database fetch & state update code into the useEffect
        const unsubscribe = navigation.addListener('focus', () => {
            retrieveRentalsFromDB();
        });

        return unsubscribe;
    }, [navigation])

    // func to retrieve favourite videos from the db
    const retrieveRentalsFromDB = async () => {

        try {

            // request data from favourite_videos collection
            const querySnapshot = await getDocs(collection(db, "Vehicle"));

            const resultsFromFirestore = []

            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                // make the object to add to the array
                const itemToAdd = {
                    id: doc.id,
                    ...doc.data()
                }
                // append to array
                resultsFromFirestore.push(itemToAdd)
            });

            console.log(resultsFromFirestore)

            // save data to a state variable
            // when the state variable updates, the list will auto update
            setMyRentals(resultsFromFirestore)
        }
        catch (err) {
            console.log(err.message)
        }

    }

    // func to delete all favourite videos from the db
    const deleteAllRentalListings = async (Vehicle) => {

        console.log("Delete all rental vehicles button pressed!")

        try {
            // Get a reference to the collection
            const collectionRef = collection(db, Vehicle);

            // Retrieve all documents from the collection
            const querySnapshot = await getDocs(collectionRef);

            // Iterate through the documents and delete each one
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
                console.log(`Document with ID ${doc.id} deleted successfully`);
            });

            console.log(`All documents deleted from collection ${Vehicle}`);

            // Re-fetch data after deletion
            retrieveRentalsFromDB();

            // alert msg
            alert("All rental vehicles deleted successfully!")
        } catch (error) {
            console.error("Error deleting documents: ", error);
        }
    }

    // Function to navigate to details screen
    const goToDetailsScreen = (id) => {
        navigation.push("RentalDetails", { id }); // Pass any necessary data to details screen
    }

    const ItemDivider = () => {
        return (
            <View style={{ height: 1, width: "100%", backgroundColor: "#888" }} />
        )
    }

    const renderRentalsItem = ({ item }) => (
        <Pressable style={styles.listItem} onPress={() => goToDetailsScreen(item.id)}>
            <View style={styles.listItemBody}>
                <Image source={{ uri: item.vehiclePhoto }} style={{ width: "40%", height: 100, marginVertical: 10, borderRadius: 10 }} />
                <View style={styles.listBody}>
                    <View style={styles.listBody}>
                        <Text style={styles.listTitle}>{item.vehicleName}</Text>
                        <Text style={styles.listPrice}>${item.price}</Text>
                    </View>
                    <Text style={styles.listAddress}>{item.pickupLocation.address}</Text>
                </View>
            </View>

        </Pressable>
    )

    // render the list
    return (
        <View style={styles.rentalContainer}>

            <Text style={styles.header}>My Rental Listings</Text>

            {/* Customized button */}
            <ButtonComponent
                onPress={() => deleteAllRentalListings("Vehicle")}
                text={"Delete All"}
                justifyContent={"flex-end"}
                bgColor={"#FF0000"}
                disabled={myRentals.length === 0}
            />

            {myRentals.length === 0 ? (
                <Text style={styles.noData}>No Data found</Text>
            ) : (

                // Customized FlatList 
                < FlatListComponent
                    data={myRentals}
                    renderItem={({ item }) => renderRentalsItem({ item })}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={ItemDivider}
                />
            )}

        </View>
    );

}

export default MyRentalListScreen;

const styles = StyleSheet.create({
    rentalContainer: {
        //   flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },

    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    noData: {
        textAlign: 'center',
        paddingTop: 100,
        fontSize: 18,
        color: 'gray',
        height: '100%',
    },

    // list item design
    listItem: {
        flexDirection: 'column',
        alignItems: 'left',
    },

    listTitle: {
        fontSize: 18,
        textAlign: 'left',
        paddingVertical: 10,
        color: 'black',
        fontWeight: 'bold',
    },
    listItemBody: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        paddingBottom: 10,
    },
    listBody: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        width: '75%',
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

});

