import { View, Text, StyleSheet, Image } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";

const MyRentalDetailsScreen = ({route}) => {

    const buttonPressed = () => {
        console.log("Button Pressed!!!")
    }

    return (

        <View style={styles.detailContainer}>

                {/* For thumbnail */}
                <Image source={{ uri: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg" }} style={{ width: "100%", height: 250 }} />

                {/* title */}
                <Text style={styles.rentalTitle}>Audi A7 TFSIe</Text>

                {/* Price */}
                <Text style={styles.videoViews}>Price</Text>

                {/* description */}
                <Text style={styles.videoDescription}>Pickup address</Text>

                {/* Customized button to add video to favourites */}
                <ButtonComponent
                    onPress={buttonPressed}
                    text={"Update"}
                    justifyContent={"center"}
                />

            </View>
    );
}

export default MyRentalDetailsScreen;

const styles = StyleSheet.create ({
    detailContainer: {
        flex: 1,
        backgroundColor: "#fff",
        height: '100%'
    },
    rentalTitle: {
        fontSize: 20,
        padding: 15,
        fontWeight: '700',
    },
})