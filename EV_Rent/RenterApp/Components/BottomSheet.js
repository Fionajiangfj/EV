/* eslint-disable react/prop-types */
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { bookingController } from '../controller/BookingController';
import { Booking } from '../model/Booking';
import StatusEnum from '../model/enum/Status';
import ButtonComponent from './ButtonComponent';
const BottomSheet = ({ isVisible, onClose, vehicle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const bottomSheetRef = useRef(null);
    const currentUserId = "amy@gmail.com" // replace with actual user ID
    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current?.present();
            console.log("Bottom sheet is open")
        } else {
            bottomSheetRef.current?.dismiss();
            console.log("Bottom sheet is closed")
        }
    }, [isVisible]);

    const getRandomFutureDate = () => {
        const today = new Date();
        const randomNumberOfDays = Math.floor(Math.random() * 30) + 1;
        today.setDate(today.getDate() + randomNumberOfDays)
        return today;
    }
    const doBooking = () => {
        const futureDate = getRandomFutureDate();
        const newBooking = new Booking(null, currentUserId, vehicle.id, futureDate, StatusEnum.pending, null)
        bookingController.addBooking(newBooking, (error, booking) => {
            if (error) {
                console.error("Error adding document: ", error);
                return;
            }
            alert("Booking request sent! You must wait for the owner to confirm your booking.")
        })
    }

    return (
        <BottomSheetModalProvider>
            {vehicle ? 
            <View style={styles.bottomSheetContainer}>


                <BottomSheetModal
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={[200, 400, 600]}
                    backgroundComponent={({ style }) => <View style={[style, styles.modalBackground]} />}
                    onChange={(index) => {
                        console.log('Modal index changed to:', index);
                        if(index===-1){
                            onClose()
                        }
                    }}
                >
                    <View style={styles.modalContent}>

                        <View style={styles.modalContentBody}>
                            <Text style={styles.modalTitle}>{vehicle.vehicleName}</Text>
                            <Text style={styles.modalSubheadingPrice}>${vehicle.price}</Text>
                        </View>

                        <Text style={styles.modalSubheadingAddress}>{vehicle.pickupLocation.address}</Text>

                        <View style={styles.modalContentImage}>
                            <Image source={{ uri: vehicle.vehiclePhoto }} style={{ width: "40%", height: 100, marginVertical: 10, borderRadius: 10 }} />
                            {/* <Image source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6TJ_XQDyZZAVlpI4WDfrr5L4_pXwBIntflbiXCoe2tAY1X4HmsD68ReBxtmeiwt00LgM&usqp=CAU" }} style={{ width: "40%", height: 100, marginVertical: 10, borderRadius: 10 }} /> */}
                        </View>

                        <Text style={styles.modalContentText}>License Plate number: {vehicle.licensePlate}</Text>
                        <Text style={styles.modalContentText}>Seat Capacity: {vehicle.capacity} seats</Text>
                        <Text style={styles.modalContentText}>Type: {vehicle.type}</Text>
                        <Text style={styles.modalContentText}>Fuel: {vehicle.fuel}</Text>
                        <ButtonComponent
                            onPress={doBooking}
                            text={"BOOK NOW"}
                            justifyContent={"center"}
                            bgColor={"#0064B1"}
                        />
                    </View>
                </BottomSheetModal>
            </View> : 
                <View>
                    <Text>Please select a vehicle</Text>
                </View>}
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
