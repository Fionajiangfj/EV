import React, { useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// 1. Import the db variable from firebaseConfig
import { db, auth } from '../firebaseConfig';
import { collection, getDocs, deleteDoc, doc, updateDoc, arrayRemove } from "firebase/firestore";

// 2. Import the components
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

    const retrieveRentalsFromDB = async () => {
        try {
            // Get the currently logged-in user
            const user = auth.currentUser;
            
            if (user) {
                const currentUserEmail = user.email; // Get the email of the current user
    
                // Request data from the Vehicle collection
                const querySnapshot = await getDocs(collection(db, "Vehicle"));
    
                const resultsFromFirestore = [];
    
                // Iterate through the documents
                querySnapshot.forEach((doc) => {
                    const vehicleData = doc.data();
                    
                    // Check if the vehicle belongs to the current user
                    if (vehicleData.owner === currentUserEmail) {
                        const itemToAdd = {
                            id: doc.id,
                            ...vehicleData
                        };
    
                        resultsFromFirestore.push(itemToAdd);
                    }
                });
    
                // Save data to the state variable
                setMyRentals(resultsFromFirestore);
            } else {
                console.log("No user logged in.");
                // Handle the case where no user is logged in, if needed
            }
        } catch (err) {
            console.log(err.message);
        }
    };


    // func to delete all rental vehicles of the logged-in user
    const deleteAllRentalListings = async () => {
        console.log("Delete all rental vehicles button pressed!");
    
        try {
            // Get the currently logged-in user
            const user = auth.currentUser;
    
            if (user) {
                const currentUserEmail = user.email; // Get the email of the current user
    
                // Get a reference to the user's document
                const userDocRef = doc(db, "User", currentUserEmail);
    
                // Retrieve all vehicles from the Vehicle collection that belong to the current user
                const querySnapshot = await getDocs(collection(db, "Vehicle"));
    
                // Array to store promises for updating user documents
                const updatePromises = [];
    
                // Iterate through the vehicles and delete each one that belongs to the current user
                querySnapshot.forEach(async (doc) => {
                    if (doc.data().owner === currentUserEmail) {
                        // Delete the vehicle document
                        await deleteDoc(doc.ref);
                        console.log(`Document with ID ${doc.id} deleted successfully`);
                        
                        // Add the promise for updating user document to array
                        updatePromises.push(updateDoc(userDocRef, {
                            vehicles: arrayRemove(doc.id)
                        }));
                        console.log(`Vehicle ID ${doc.id} removed from user's vehicles array`);
                    }
                });
    
                // Wait for all promises to resolve
                await Promise.all(updatePromises);
    
                console.log("All rental vehicles of the logged-in user deleted successfully!");
    
                // Re-fetch data after deletion
                retrieveRentalsFromDB();
    
                // alert msg
                alert("All rental vehicles deleted successfully!");
            } else {
                console.log("No user logged in.");
                // Handle the case where no user is logged in, if needed
            }
        } catch (error) {
            console.error("Error deleting rental vehicles: ", error);
        }
    }


    // Function to navigate to details screen
    const goToDetailsScreen = (id) => {
        navigation.navigate("Rental Details Screens", {
            screen: 'RentalDetails',
            params: { id: id },
        }); // Pass any necessary data to details screen
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

