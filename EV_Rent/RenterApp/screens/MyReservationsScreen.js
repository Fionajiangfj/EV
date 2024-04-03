import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { bookingController } from '../controller/BookingController';
import { vehicleController } from '../controller/VehicleController';
const MyReservationsScreen = () => {
    const [bookings, setBookings] = useState([]);

    const formatDate = (isoDateString) => {
        if (!isoDateString) return '';
        const date = new Date(isoDateString); // Directly parse the ISO string
        return date.toLocaleDateString("en-US", {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZoneName: 'short'
        }); // Example: "April 8, 2024, 7:54 PM PDT"
      };
      
      useEffect(() => {
        const userId = 'amy@gmail.com'; // Replace this with the actual user ID
        const unsubscribe = bookingController.fetchUserBookings(userId, async (bookings) => {
            const bookingsWithVehicleInfo = await Promise.all(bookings.map(async (booking) => {
                const vehicleInfo = await vehicleController.fetchVehicleById(booking.vehicle);
                return { ...booking, vehicle: vehicleInfo }; // Combine booking with fetched vehicle info
            }));
            setBookings(bookingsWithVehicleInfo);
        });
    
        return () => unsubscribe && unsubscribe();
    }, []);
    

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.bookingItem}>
                        <Text style={styles.title}>Name: {item.vehicle.vehicleName}</Text>
                        <Text>Date: {formatDate(item.bookingDate)}</Text>
                        <Text>License Plate: {item.vehicle.licensePlate}</Text>
                        <Text>Pickup Location: {item.vehicle.pickupLocation.address}</Text>
                        <Text>Price: ${item.vehicle.price}</Text>
                        <Text>Status: {item.status}</Text>
                        {item.status === 'confirmed' && <Text>Confirmation Code: {item.confirmationCode}</Text>}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
    },
    bookingItem: {
        backgroundColor: '#f9f9f9',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 8,
    },
    ownerPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 8,
    }
});

export default MyReservationsScreen;
