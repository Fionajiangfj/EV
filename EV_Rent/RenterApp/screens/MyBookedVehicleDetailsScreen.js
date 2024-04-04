import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";
import { bookingController } from '../controller/BookingController';
import { vehicleController } from '../controller/VehicleController';

const MyBookedVehicleDetailsScreen = ({ route, navigation }) => {

    const { booking } = route.params;

    // Convert ISO string to Date object
    const bookingDate = new Date(booking.bookingDate); 
    // Format the date and time
const formattedDate = bookingDate.toLocaleString('en-US', {
    month: 'long', // Full month name
    day: 'numeric', // Day of the month
    year: 'numeric', // Full year
    hour: 'numeric', // 12-hour format
    minute: 'numeric', // Minutes
    second: 'numeric', // Seconds
    hour12: true // 12-hour time format (AM/PM)
});

    // state variables
    const [selectedBooking, setSelectedBooking] = useState(booking);

    const buttonPressed = () => {
        console.log("Button Pressed!!!")
        navigation.goBack();
    }

    return (

        <View style={styles.detailContainer}>
            <Image source={{ uri: selectedBooking.vehicle.vehiclePhoto }} style={{ width: "100%", height: 250 }} />
            <View style={styles.detailHeader}>
                <Text style={styles.rentalTitle}>{selectedBooking.vehicle.vehicleName}</Text>
                <Text style={styles.rentalPrice}>${selectedBooking.vehicle.price}</Text>
            </View>
            <Text style={styles.rentalAddress}>{selectedBooking.vehicle.pickupLocation?.address}</Text>
            <Text style={styles.detailText}>License Plate number: {selectedBooking.vehicle.licensePlate}</Text>
            <Text style={styles.detailText}>Seat Capacity: {selectedBooking.vehicle.capacity} seats</Text>
            <Text style={styles.detailText}>Fuel: {selectedBooking.vehicle.fuel}</Text>
            <Text style={styles.detailText}>Type: {selectedBooking.vehicle.type}</Text>
            <Text style={styles.detailText}>Owner: {selectedBooking.vehicle.owner}</Text>
            <Text style={styles.detailText}>Status: {selectedBooking.status}</Text>
            <Text style={styles.detailText}>Date: {formattedDate}</Text>
            {selectedBooking.status === 'confirmed' && <Text style={styles.detailText}>Confirmation Code: {selectedBooking.confirmationCode}</Text>}
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