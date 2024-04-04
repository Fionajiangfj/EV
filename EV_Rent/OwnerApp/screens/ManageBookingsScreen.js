import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import { db } from '../firebaseConfig'; // Your Firebase config file

const ManageBookingsScreen = () => {
    const [bookings, setBookings] = useState([]);
    const [usernameFromUI, setUsernameFromUI] = useState("amy@gmail.com");
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
        const fetchBookingsForOwner = async (ownerId) => {
          // Step 1: Fetch all vehicles owned by the ownerId
        const vehiclesQuery = query(collection(db, 'Vehicle'), where('owner', '==', ownerId));
        const vehiclesSnapshot = await getDocs(vehiclesQuery);
        const vehicles = vehiclesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("vehicles",vehicles);
        let allBookings = [];
        for (const vehicle of vehicles) {
            const bookingQuery = query(collection(db, 'Booking'), where('vehicle', '==', vehicle.id));
            const bookingsSnapshot = await getDocs(bookingQuery);
            const bookingsForVehicle = bookingsSnapshot.docs.map(doc => {
                console.log("docID:::::",{ id: doc.id, ...doc.data(), vehicleInfo: vehicle});

                return ({ id: doc.id, ...doc.data(), vehicleInfo: vehicle})
            
            });
            allBookings = [...allBookings, ...bookingsForVehicle];
        }
        console.log(allBookings);
        setBookings(allBookings);
        };
    
        fetchBookingsForOwner(usernameFromUI); // Pass the actual owner ID here
    }, []);

    const handleApproveBooking = async (bookingId) => {
        // Generate a confirmation code
        const confirmationCode = Math.random().toString(36).substr(2, 9); // Simple example, consider using a more robust method

        // Update the booking in Firestore with 'Approved' status and confirmation code
        const bookingRef = doc(db, 'Booking', bookingId);
        await updateDoc(bookingRef, {
            status: 'confirmed',
            confirmationCode: confirmationCode,
        });
        const index = bookings.findIndex(booking => booking.id === bookingId);
        if (index !== -1) {
            // Clone the bookings array for immutability
            const updatedBookings = [...bookings];
            // Update the specific booking
            updatedBookings[index] = {...updatedBookings[index], status: 'confirmed', confirmationCode: confirmationCode};
            // Update the state
            setBookings(updatedBookings);
        }
    };

    const handleDeclineBooking = async (bookingId) => {
        // Update the booking in Firestore with 'Declined' status
        const bookingRef = doc(db, 'Booking', bookingId);
        await updateDoc(bookingRef, {
            status: 'declined',
        });

        const index = bookings.findIndex(booking => booking.id === bookingId);
        if (index !== -1) {
            // Clone the bookings array for immutability
            const updatedBookings = [...bookings];
            // Update the specific booking
            updatedBookings[index] = {...updatedBookings[index], status: 'declined'};
            // Update the state
            setBookings(updatedBookings);
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                keyExtractor={item => {
                    if (!item.id) {
                      console.error('Null ID encountered', item);
                    }
                    return item.id || Math.random().toString();
                  }}                renderItem={({ item }) => (
                    <View style={styles.bookingItem}>
                        <Text style={styles.title}>{item.vehicleInfo.vehicleName}</Text>
                        <Text>License: {item.vehicleInfo.licensePlate}</Text>
                        <Text>Pick up location: {item.vehicleInfo.pickupLocation.address}</Text>
                        <Text>Price: ${item.vehicleInfo.price}</Text>
                        <Text>Renter: {item.renter}</Text>
                        <Text>Booking Date: {formatDate(item.bookingDate)}</Text>
                        <Text>Status: {item.status}</Text>
                        {item.status === 'confirmed' && <Text>Confirmation Code: {item.confirmationCode}</Text>}
                        {item.status === 'pending' && (
                            <View style={styles.buttonsContainer}>
                                <Button title="Approve" onPress={() => handleApproveBooking(item.id)} />
                                <Button title="Decline" onPress={() => handleDeclineBooking(item.id)} />
                            </View>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bookingItem: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    renterPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default ManageBookingsScreen;
