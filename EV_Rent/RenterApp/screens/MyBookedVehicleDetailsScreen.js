import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";

const MyBookedVehicleDetailsScreen = ({ route, navigation }) => {

    const { booking } = route.params;
    const selectedBooking = JSON.parse(booking); // Parse the string back to an object
    const bookingDate = new Date(selectedBooking.bookingDate); // Convert ISO string to Date object


    // state variables
    const [selectedBookingInfo, setSelectedBookingInfo] = useState(selectedBooking);

    const buttonPressed = () => {
        console.log("Button Pressed!!!")
        navigation.goBack();
    }

    useEffect(() => {
        console.log(`selected booking info: ${selectedBookingInfo.bookingDate} ${selectedBookingInfo.status}`)
    }, [])

    return (

        <View style={styles.detailContainer}>
            <Image source={{ uri: selectedBookingInfo.vehicle.vehiclePhoto }} style={{ width: "100%", height: 250 }} />
            <View style={styles.detailHeader}>
                <Text style={styles.rentalTitle}>{selectedBookingInfo.vehicle.vehicleName}</Text>
                <Text style={styles.rentalPrice}>${selectedBookingInfo.vehicle.price}</Text>
            </View>
            <Text style={styles.rentalAddress}>{selectedBookingInfo.vehicle.pickupLocation?.address}</Text>
            <Text style={styles.detailText}>License Plate number: {selectedBookingInfo.vehicle.licensePlate}</Text>
            <Text style={styles.detailText}>Seat Capacity: {selectedBookingInfo.vehicle.capacity} seats</Text>
            <Text style={styles.detailText}>Fuel: {selectedBookingInfo.vehicle.fuel}</Text>
            <Text style={styles.detailText}>Type: {selectedBookingInfo.vehicle.type}</Text>
            <Text style={styles.detailText}>Owner: {selectedBookingInfo.vehicle.owner}</Text>
            <Text style={styles.detailText}>Status: {selectedBookingInfo.status}</Text>
            <Text style={styles.detailText}>Date: {bookingDate.toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZoneName: 'short'
            })}</Text>
            {selectedBookingInfo.status === 'confirmed' && <Text style={styles.detailText}>Confirmation Code: {selectedBookingInfo.confirmationCode}</Text>}
            <ButtonComponent
                onPress={buttonPressed}
                text={"Done"}
                justifyContent={"center"}
                bgColor={"#0064B1"}
            />
        </View>
    );
}

export default MyBookedVehicleDetailsScreen;

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