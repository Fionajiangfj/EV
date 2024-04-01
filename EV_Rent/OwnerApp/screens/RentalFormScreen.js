import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const RentalFormScreen = () => {
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicleIndex, setSelectedVehicleIndex] = useState();
    const [vehicleName, setVehicleName] = useState('');
    const [capacity, setCapacity] = useState('');
    const [fuel, setFuel] = useState('');
    const [type, setType] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [address, setAddress] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await fetch('https://fionajiangfj.github.io/EVRentingApp/vehicles.json');
                const data = await response.json();
                // Assuming the API directly returns an array of vehicles
                setVehicles(data || []); // Fallback to an empty array if undefined
            } catch (error) {
                console.error('Failed to fetch vehicles:', error);
                setVehicles([]); // Ensure vehicles is always an array
            }
        };
    
        fetchVehicles();
    }, []);

    const handleVehicleChange = (itemValue, itemIndex) => {
        console.log("Selected index:", itemIndex); // Debug index
        setSelectedVehicleIndex(itemIndex);
        const selectedVehicle = vehicles[itemIndex];
        console.log("Selected vehicle:", selectedVehicle);
        setVehicleName(`${selectedVehicle.make} ${selectedVehicle.model} ${selectedVehicle.trim}`);
        setCapacity(selectedVehicle?.capacity?.toString() || '');
        setFuel(selectedVehicle?.fuel?.toString() || '');
        setType(selectedVehicle?.type?.toString() || '')

    };

    // Placeholder function for adding a photo
    const handleAddPhoto = () => {
        // Here, you would integrate your photo selection logic
        alert('Add photo logic goes here.');
    };

    // Placeholder function for form submission
    const handleSubmit = () => {
        // Here, you would integrate your form submission logic
        alert('Form submission logic goes here.');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.label}>Vehicle Name:</Text>
            <Picker
                selectedValue={selectedVehicleIndex}
                onValueChange={handleVehicleChange}
            >
                {vehicles.map((vehicle, index) => (
                    <Picker.Item
                        key={index}
                        label={`${vehicle.make} ${vehicle.model} ${vehicle.trim}`}
                        value={index}
                    />
                ))}
            </Picker>
            <Button
                title="Add Vehicle Photo"
                onPress={handleAddPhoto}
            />

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

            <Text style={styles.label}>Address:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setAddress}
                value={address}
            />

            <Text style={styles.label}>Price:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setPrice}
                value={price}
                keyboardType="numeric"
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
});

