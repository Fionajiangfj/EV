import React, { useRef, useState } from 'react';
import { View, Pressable, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ButtonComponent from './ButtonComponent';

const BottomSheet = () => {
    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetModalRef = useRef(null);

    const openBottomSheet = () => {
        setIsOpen(true);
        bottomSheetModalRef.current?.present();
    };

    // const closeBottomSheet = () => {
    //     setIsOpen(false);
    //     bottomSheetModalRef.current?.close();
    // };

    const doBooking = () => {
        console.log("Book Now button pressed!")
        alert("Book Now button pressed!")
    }

    return (
        <BottomSheetModalProvider>
            <View style={styles.bottomSheetContainer}>
                <Pressable onPress={openBottomSheet}>
                    <Icon name="map-marker-alt" size={28} color="#0064B1" />
                </Pressable>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={[200, 400, 600]}
                    backgroundComponent={({ style }) => <View style={[style, styles.modalBackground]} />}
                >
                    <View style={styles.modalContent}>

                        <View style={styles.modalContentBody}>
                            <Text style={styles.modalTitle}>Audi A7 TFSIe</Text>
                            <Text style={styles.modalSubheadingPrice}>$250</Text>
                        </View>

                        <Text style={styles.modalSubheadingAddress}>153 Main Street, Seattle, Washington, USA</Text>

                        <View style={styles.modalContentImage}>
                            <Image source={{ uri: "https://hips.hearstapps.com/hmg-prod/images/2019-honda-civic-sedan-1558453497.jpg" }} style={{ width: "40%", height: 100, marginVertical: 10, borderRadius: 10 }} />
                            <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6TJ_XQDyZZAVlpI4WDfrr5L4_pXwBIntflbiXCoe2tAY1X4HmsD68ReBxtmeiwt00LgM&usqp=CAU" }} style={{ width: "40%", height: 100, marginVertical: 10, borderRadius: 10 }} />
                        </View>

                        <Text style={styles.modalContentText}>License Plate number: BLHT281</Text>
                        <Text style={styles.modalContentText}>Seat Capacity: 5 seats</Text>
                        <Text style={styles.modalContentText}>Color: Blue</Text>

                        <ButtonComponent
                            onPress={doBooking}
                            text={"BOOK NOW"}
                            justifyContent={"center"}
                            bgColor={"#0064B1"}
                        />
                    </View>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
};

const styles = StyleSheet.create({
    bottomSheetContainer: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalBackground: {
        backgroundColor: 'white',
    },
    closeButton: {
        marginTop: 10,
        alignSelf: 'flex-end',
        color: '#0064B1',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 5,
    },
    modalContentBody: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    modalSubheadingAddress: {
        fontSize: 16,
        fontWeight: '500',
        color: 'gray',
        paddingBottom: 8,
    },
    modalSubheadingPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#0064B1',
        paddingVertical: 8,
    },
    modalContentText: {
        fontSize: 15,
        paddingVertical: 5,
    },
    modalContentImage: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
        paddingBottom: 10,
    },

});

export default BottomSheet;
