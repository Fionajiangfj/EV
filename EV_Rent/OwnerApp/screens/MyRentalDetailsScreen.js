import { View, Text, StyleSheet } from "react-native";

const MyRentalDetailsScreen = () => {

    return (
        <View style={styles.container}> 
            <Text style={styles.header}>Rental Details Screen</Text>
        </View>
    );
}

export default MyRentalDetailsScreen;

const styles = StyleSheet.create ({
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