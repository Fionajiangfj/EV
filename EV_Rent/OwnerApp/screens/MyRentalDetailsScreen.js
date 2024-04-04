import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";

// components
import ButtonComponent from "../Components/ButtonComponent";

// firestore
import { db } from "../firebaseConfig";
import { collection, doc, getDoc, deleteDoc } from "firebase/firestore";


const MyRentalDetailsScreen = ({ route }) => {

    // state variables
    const [selectedVehicleData, setSelectedVehicleData] = useState([])

    useEffect(() => {
        getSelectedVehicleDataFromDB()
    }, [])

    const buttonPressed = () => {
        console.log("Button Pressed!!!")
        alert("Deleted successfully!")
    }

    const getSelectedVehicleDataFromDB = async () => {

        console.log("Getting details of selected vehicle")

        try {

            // get id from rental list screen
            const { id } = route.params;
            console.log(id)

            // doc to retrieve
            const documentToRetrieve = doc(db, "Vehicle", id)

            // get the specified document
            const documentSnapshot = await getDoc(documentToRetrieve);

            if (documentSnapshot.exists()) {
                // if the document can be found, output its data
                console.log("Document data:", documentSnapshot.data());

                // set the array of data to state
                setSelectedVehicleData(documentSnapshot.data())

                console.log(documentSnapshot.data())

            } else {
                // if the document cannot be found, show an error
                // in this case, documentSnapshot.data() will be undefined
                console.log("No such document!");
                selectedVehicleData([])
            }
        } catch (err) {
            console.log(err.message)
        }

    }

    return (

        <View style={styles.detailContainer}>

            {/* Image */}
            <Image source={{ uri: selectedVehicleData.vehiclePhoto }} style={{ width: "100%", height: 250 }} />

            <View style={styles.detailHeader}>
                {/* vehicle name */}
                <Text style={styles.rentalTitle}>{selectedVehicleData.vehicleName}</Text>

                {/* Price */}
                <Text style={styles.rentalPrice}>${selectedVehicleData.price}</Text>
            </View>

            <Text style={styles.rentalAddress}>{selectedVehicleData.pickupLocation?.address}</Text>

            {/* description */}
            <Text style={styles.detailText}>License Plate number: {selectedVehicleData.licensePlate}</Text>
            <Text style={styles.detailText}>Seat Capacity: {selectedVehicleData.capacity} seats</Text>
            <Text style={styles.detailText}>Fuel: {selectedVehicleData.fuel}</Text>
            <Text style={styles.detailText}>Type: {selectedVehicleData.type}</Text>
            <Text style={styles.detailText}>Owner: {selectedVehicleData.owner}</Text>


            {/* Customized button to add video to favourites */}
            {/* <ButtonComponent
                onPress={buttonPressed}
                text={"Update"}
                justifyContent={"center"}
                bgColor={"#0064B1"}
            /> */}
            <ButtonComponent
                onPress={buttonPressed}
                text={"Delete"}
                justifyContent={"center"}
                bgColor={"#FF0000"}
            />

        </View>
    );
}

export default MyRentalDetailsScreen;

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        backgroundColor: "#fff",
        height: '100%'
    },
    detailHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rentalTitle: {
        fontSize: 20,
        padding: 15,
        fontWeight: '700',
        width: "70%",
    },
    rentalPrice: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0064B1',
        padding: 15,
        // width: "30%",
    },
    rentalAddress: {
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
        paddingBottom: 8,
        paddingHorizontal: 15,
    },
    detailText: {
        fontSize: 15,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
})