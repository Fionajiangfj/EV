import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

//db
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

import * as Location from "expo-location";
import DropDownPicker from 'react-native-dropdown-picker';
import ButtonComponent from '../Components/ButtonComponent';
import { View } from 'react-native';

const RentalFormScreen = ({ navigation, route }) => {

    const { email } = route.params
    const [vehicles, setVehicles] = useState([]);
    const [userName, setUserName] = useState('');

    //DropDownPicker
    const [selectedVehicleIndex, setSelectedVehicleIndex] = useState();
    const [vehicleName, setVehicleName] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    //other form fields
    const [imageURL, setImageURL] = useState('');
    const [capacity, setCapacity] = useState(0);
    const [fuel, setFuel] = useState('');
    const [type, setType] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [address, setAddress] = useState('');
    // const [latLng, setLatLng] = useState({ lat: null, lng: null });
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetchUserData();
        fetchVehicles();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchVehicles();
        }, [])
    );
    
    const fetchUserData = async () => {
        try {
            const userRef = doc(db, "User", email);
            const userSnap = await getDoc(userRef);
    
            if (userSnap.exists()) {
                const userData = userSnap.data();
                setUserName(userData.name); // Assuming 'name' is the field storing the user's name
            } else {
                console.error("User document does not exist.");
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    };

    const fetchVehicles = async () => {
        try {
            const response = await fetch('https://fionajiangfj.github.io/EVRentingApp/vehicles.json');
            const data = await response.json();

            const dropdownItems = data.map((vehicle, index) => ({
                label: `${vehicle.make} ${vehicle.model} ${vehicle.trim}`,
                value: `${vehicle.make}-${vehicle.model}-${vehicle.trim}`, // Ensuring uniqueness
                ...vehicle
            }));
            setItems(dropdownItems || []);

            setVehicles(data || []); // Fallback to an empty array if undefined
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
            setVehicles([]); // Ensure vehicles is always an array
        }
    };

    const handleVehicleChange = (combinedValue) => {
        // const selectedVehicle = vehicles.find(vehicle => vehicle.make === vehicleMake);

        // Split the combined value back into its components
        if (combinedValue) {

            const [selectedMake, selectedModel, selectedTrim] = combinedValue.split('-');

            // Find the corresponding vehicle in the vehicles array
            const selectedVehicle = vehicles.find(vehicle =>
                vehicle.make === selectedMake &&
                vehicle.model === selectedModel &&
                vehicle.trim === selectedTrim
            );

            if (selectedVehicle) {
                setVehicleName(`${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.trim}`);
                setImageURL(selectedVehicle?.images[0]?.url_full?.toString() || '');
                setCapacity(selectedVehicle?.seats_max?.toString() || '');
                setFuel(selectedVehicle?.fuel?.toString() || '');
                setType(selectedVehicle?.type?.toString() || '')
            }
        }
    };

    // Placeholder function for form submission
    const handleSubmit = async () => {

        console.log(email);

        let errorMessage = "";

        if (!vehicleName.trim()) errorMessage += "Vehicle name is required.\n";
        if (!capacity.toString().trim() || isNaN(capacity) || Number(capacity) <= 0) {
            errorMessage += "Capacity must be a positive number.\n";
        }
        if (!fuel.trim()) errorMessage += "Fuel type is required.\n";
        if (!type.trim()) errorMessage += "Vehicle type is required.\n";
        if (!licensePlate.trim()) errorMessage += "License Plate number is required.\n";
        if (!address.trim()) errorMessage += "Address is required.\n";
        if (!price.toString().trim() || isNaN(price) || Number(price) <= 0) {
            errorMessage += "Enter correct price.\n";
        }

        if (errorMessage) {
            alert(`Please correct the following errors:\n${errorMessage}`);
            // Stop the form submission
            return;
        }

        try {
            console.log(`Attempting to geocode: ${address}`)
            const geocodedLocation = await Location.geocodeAsync(address)
            const result = geocodedLocation[0]
            if (result === undefined) {
                alert("No coordinates found")
                return
            }
            console.log(result)

            insertCar({
                address: address,
                lat: result.latitude,
                lng: result.longitude,
            });

        } catch (err) {
            console.log(err)
        }
    };

    const insertCar = async (pickupAddress) => {
        console.log(`Submit button pressed`);

        try {
            const carToInsert = {
                vehicleName: vehicleName,
                vehiclePhoto: imageURL,
                capacity: capacity,
                fuel: fuel,
                type: type,
                licensePlate: licensePlate,
                price: price,
                pickupLocation: pickupAddress,
                owner: email

            }

            console.log(`carToInsert : ${carToInsert}`);

            // Add the car document to the Vehicles collection
            const vehicleDocRef = await addDoc(collection(db, "Vehicle"), carToInsert);
            console.log(`Car added successfully with ID: ${vehicleDocRef.id}`);

            // After successful submission, reset the form
            resetForm();

            // Retrieve the user document from Firestore
            const userRef = doc(db, "User", email);
            const userSnap = await getDoc(userRef);

            // Check if the user exists
            if (userSnap.exists()) {
                // Update the user document to include the ID of the newly added car in its vehicle list
                const userData = userSnap.data();
                const updatedVehicles = userData.vehicles || [];
                updatedVehicles.push(vehicleDocRef.id);

                // Update the user document
                await updateDoc(userRef, { vehicles: updatedVehicles });
                console.log(`User document updated successfully.`);
            } else {
                console.error("User document does not exist.");
            }

            // navigation.dispatch(StackActions.pop(1));
            navigation.navigate('Rental List');


        } catch (err) {
            console.error(`Error while saving document to collection : ${err}`);
        }
    }

    // To reset the form
    const resetForm = () => {
        setSelectedVehicleIndex(null);
        setVehicleName('');
        setOpen(false);
        setValue(null);
        setItems([]);
        setImageURL('');
        setCapacity(0);
        setFuel('');
        setType('');
        setLicensePlate('');
        setAddress('');
        setPrice(0);

    };


    return (
        <View style={styles.container}>

            <Text style={styles.homeHeader}>Welcome {userName}</Text>
            <Text style={styles.label}>Vehicle Name:</Text>

            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                searchable={true}
                onChangeValue={(value) => {
                    handleVehicleChange(value);
                }}
                zIndex={3000}
                zIndexInverse={1000}
            />

            {
                imageURL !== '' && (
                    <Image
                        style={styles.carImage}
                        source={{ uri: imageURL }}
                    />
                )
            }

            <View style={styles.inputViewContainer}>
                <View style={[styles.inputViewContent, { marginTop: 15 }]}>
                    <Text style={styles.label}>Capacity:</Text>
                    <TextInput
                        style={styles.inputContent}
                        onChangeText={setCapacity}
                        value={String(capacity)}
                        keyboardType="numeric"
                    />
                </View>

                <View style={[styles.inputViewContent, { marginTop: 15 }]}>
                    <Text style={styles.label}>Fuel:</Text>
                    <TextInput
                        style={styles.inputContent}
                        onChangeText={setFuel}
                        value={fuel}
                        placeholder='Fuel'
                    />
                </View>
            </View>

            <View style={styles.inputView}>
                <Text style={styles.label}>Type:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setType}
                    value={type}
                    placeholder='Type'
                />
            </View>

            <View style={styles.inputView}>
                <Text style={styles.label}>Price:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPrice}
                    value={String(price)}
                    keyboardType="numeric"
                    placeholder='Enter Price'
                />

            </View>

            <Text style={styles.label}>License Plate:</Text>
            <TextInput
                style={styles.userInput}
                onChangeText={setLicensePlate}
                value={licensePlate}
                placeholder='Enter License Plate number'
            />

            <Text style={styles.label}>Address:</Text>
            <TextInput
                style={styles.userInput}
                onChangeText={setAddress}
                value={address}
                placeholder='Enter address'
            />


            {/* Customized button */}
            <ButtonComponent
                onPress={handleSubmit}
                text={"Submit"}
                justifyContent={"center"}
                bgColor={"#0064B1"}
            />
        </View>
    );
};

export default RentalFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },

    homeHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    label: {
        marginVertical: 8,
        fontSize: 15,
        fontWeight: 'bold',
    },

    carImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',

    },

    inputViewContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    inputViewContent: {
        flexDirection: 'column',
        width: '47%'
    },

    inputContent: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },

    inputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        width: '70%'
    },
    userInput: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 5,
        borderRadius: 5,
    },
});

