import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { bookingController } from '../controller/BookingController';
import { vehicleController } from '../controller/VehicleController';

const MyReservationsScreen = ({ navigation }) => {
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

    const goToBookingDetailsScreen = (booking) => {
        const bookingString = JSON.stringify({
            ...booking,
            bookingDate: booking.bookingDate.toISOString() // Convert Date to ISO string
        });
        navigation.push("BookingDetails", { booking: bookingString });
    }

    const renderBookingItem = ({ item }) => {
        if (!item.vehicle || !item.vehicle.vehiclePhoto) {
            // Handle the case where item.vehicle or item.vehicle.vehiclePhoto is null
            return null;
        }
    
        return (
            <Pressable style={styles.listItem} onPress={() => goToBookingDetailsScreen(item)}>
                <View style={styles.bookingItem}>
                    <Image source={{ uri: item.vehicle.vehiclePhoto }} style={styles.bookingImage} />
                    <View style={styles.bookingListsItem}>
                        <Text style={styles.bookingTitle}>{item.vehicle.vehicleName}</Text>
                        <Text style={styles.bookingDate}>{formatDate(item.bookingDate)}</Text>
                        <Text>Pickup Location: {item.vehicle.pickupLocation.address}</Text>
                        <View style={styles.bookingCol}>
                            <Text style={styles.bookingPrice}>${item.vehicle.price}</Text>
                            <Text style={styles.bookingStatus}> |  Status: {item.status}</Text>
                        </View>
                        {item.status === 'confirmed' && <Text>Confirmation Code: {item.confirmationCode}</Text>}
                    </View>
                </View>
            </Pressable>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={bookings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => renderBookingItem({ item })}
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
        marginVertical: 5,
        marginHorizontal: 8,
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    bookingListsItem: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        gap: 10,
    },

    bookingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    image: {
        width: '40%',
        height: 200,
        resizeMode: 'cover',
        marginVertical: 8,
    },

    bookingImage: {
        width: "40%",
        height: 100,
        marginVertical: 10,
        marginRight: 10,
        borderRadius: 10
    },

    ownerPhoto: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginTop: 8,
    },
    bookingCol: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    bookingPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0064B1',
    },
    bookingStatus: {
        fontSize: 14,
        fontWeight: '500',
        color: 'gray',
    },
    bookingDate: {
        fontSize: 12,
        color: 'gray',
    }
});

export default MyReservationsScreen;
