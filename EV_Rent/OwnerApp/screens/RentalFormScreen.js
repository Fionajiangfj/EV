import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Picker, Image } from 'react-native';

//db
import { db } from "../firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, getDoc, doc } from "firebase/firestore";

import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from "expo-location";

const RentalFormScreen = ( {navigation, route} ) => {

    const {email} = route.params
    const [vehicles, setVehicles] = useState([]);

    //DropDownPicker
    const [selectedVehicleIndex, setSelectedVehicleIndex] = useState();
    const [vehicleName, setVehicleName] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);

    //other form fields
    const [imageURL, setImageURL] = useState('');
    const [capacity, setCapacity] = useState('');
    const [fuel, setFuel] = useState('');
    const [type, setType] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [address, setAddress] = useState('');
    // const [latLng, setLatLng] = useState({ lat: null, lng: null });
    const [price, setPrice] = useState('');

    useEffect(() => {
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

        fetchVehicles();
    }, []);

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
        if (!capacity.trim() || isNaN(capacity) || Number(capacity) <= 0) {
            errorMessage += "Capacity must be a positive number.\n";
        }
        if (!fuel.trim()) errorMessage += "Fuel type is required.\n";
        if (!type.trim()) errorMessage += "Vehicle type is required.\n";
        if (!address.trim()) errorMessage += "Address is required.\n";
        if (!price.trim() || isNaN(price) || Number(price) < 0) {
            errorMessage += "Price must be a non-negative number.\n";
        }

        if (errorMessage) {
            alert(`Please correct the following errors:\n${errorMessage}`);
            return; // Stop the form submission
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
                lat: result.latitude,
                lng: result.longitude,
            });

        } catch (err) {
            console.log(err)
        }
    };

    const insertCar = async (latLng) => {
        console.log(`Submit button pressed`);

        try{
            const carToInsert = {
                vehicleName: vehicleName,
                vehiclePhoto: imageURL,
                capacity: capacity,
                fuel: fuel,
                type: type,
                licensePlate: licensePlate,
                pickupAddress: address,
                price: price,
                latLng: latLng
            }

            console.log(`carToInsert : ${carToInsert}`);

            //to add into independent collection
            // const insertedDoc = await addDoc(collection(db, "employees"), employeeToInsert);
            // console.log(`Employee added successfully : ${insertedDoc.id}`);

            //to add document to subcollection
            const subCollectionRef = collection(db, "User", email, "Vehicle");
            const insertedDoc = await addDoc(subCollectionRef, carToInsert);
            console.log(`Car added successfully : ${insertedDoc.id}`);

            // navigation.dispatch(StackActions.pop(1));
            navigation.navigate('Rental List')

        }catch(err){
            console.error(`Error while saving document to collection : ${err}`);
        }
    }


    return (
        <ScrollView style={styles.container}>
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
                zIndex={3000} // Ensure dropdown covers other components
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

            <Text style={styles.label}>Capacity:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setCapacity}
                value={capacity}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Fuel:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setFuel}
                value={fuel}
            />

            <Text style={styles.label}>Type:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setType}
                value={type}
            />

            <Text style={styles.label}>License Plate:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setLicensePlate}
                value={licensePlate}
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPrice}
                value={price}
                keyboardType="numeric"
            />

            <Text style={styles.label}>Address:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAddress}
                value={address}
            />

            <Button
                title="Submit"
                onPress={handleSubmit}
            />
        </ScrollView>
    );
};

export default RentalFormScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        marginVertical: 8,
    },
    input: {
        borderColor: '#cccccc',
        borderWidth: 1,
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    carImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
});

