import React from "react";
import { StyleSheet, Text, View } from "react-native";
const MyReservationsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Reservations Screen</Text>
        </View>
    )
}

export default MyReservationsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    header: {
        fontSize: 25,
        fontWeight: 'bold',
    },
})