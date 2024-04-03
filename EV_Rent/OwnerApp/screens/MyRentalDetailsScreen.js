import { View, Text, StyleSheet, Image } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";

const MyRentalDetailsScreen = ({ route }) => {

    const buttonPressed = () => {
        console.log("Button Pressed!!!")
        alert("Deleted successfully!")
    }

    return (

        <View style={styles.detailContainer}>

            {/* Image */}
            <Image source={{ uri: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg" }} style={{ width: "100%", height: 250 }} />

            <View style={styles.detailHeader}>
                {/* vehicle name */}
                <Text style={styles.rentalTitle}>Audi A7 TFSIe</Text>

                {/* Price */}
                <Text style={styles.rentalPrice}>Price</Text>
            </View>

            <Text style={styles.rentalAddress}>Pickup address</Text>

            {/* description */}
            <Text style={styles.detailText}>License Plate number: BLHT281</Text>
            <Text style={styles.detailText}>Seat Capacity: 5 seats</Text>
            <Text style={styles.detailText}>Color: Blue</Text>


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