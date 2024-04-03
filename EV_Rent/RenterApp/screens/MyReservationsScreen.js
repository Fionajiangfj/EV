import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { UserController } from '../controller/UserController'; // Update with your actual path
const MyReservationsScreen = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const userId = 'currentUserId';
        UserController.fetchUserBookings(userId, (bookings) => {
            // This function gets called every time there's a change to the user's bookings
            console.log(bookings);
            setBookings(bookings);
            // You can now set your state here to update the UI in real-time
        });
    }, []);



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={bookings}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.vehicle.name}</Text>
                        <Text>{item.date}</Text>
                        <Text>{item.vehicle.license_plate}</Text>
                        <Text>{item.vehicle.pickup_address}</Text>
                        <Text>{item.vehicle.price}</Text>
                        <Text>{item.owner.name}</Text>
                        <img src={item.owner.photo}/>
                        
                        <Text>{item.status}</Text>
                        <Text>{item.confirmationCode}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default MyReservationsScreen;
