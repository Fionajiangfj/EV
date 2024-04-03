import { View, Text, StyleSheet, Image } from "react-native";
import ButtonComponent from "../Components/ButtonComponent";

const MyRentalDetailsScreen = ({route}) => {

    const buttonPressed = () => {
        console.log("Button Pressed!!!")
    }

    return (

        <View style={styles.detailContainer}>

                {/* For thumbnail */}
                <Image source={{ uri: "https://www.adobe.com/express/create/thumbnail/media_184a3a28ded5926b56142bf7f41b1c6972df38f0c.png?width=750&format=png&optimize=medium" }} style={{ width: "100%", height: 320 }} />

                {/* title */}
                <Text style={styles.rentalTitle}>Rental Details Screen</Text>

                {/* Views */}
                <Text style={styles.videoViews}>Views: </Text>

                {/* description */}
                <Text style={styles.videoDescription}>description</Text>

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