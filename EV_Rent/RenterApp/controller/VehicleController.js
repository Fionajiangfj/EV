/* eslint-disable no-unused-vars */
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Update the import path to your firebase configuration
import { Vehicle } from '../model/Vehicle'; // Adjust the import path to your Vehicle class

let instance = null;
class VehicleController {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    async fetchVehicles(callback) {
        try {
            const querySnapshot = await getDocs(collection(db, 'Vehicle'));
            const vehicles = [];
            querySnapshot.forEach((doc) => {
                const vehicle = Vehicle.fromFirestore(doc);
                vehicles.push(vehicle);
            });
            callback(null, vehicles)
        } catch (error) {
            console.error("Error fetching vehicles: ", error);
            callback(error);
            throw new Error("Failed to fetch vehicles");
        }
    }

// Assuming you have a vehicleController similar to your bookingController
    async fetchVehicleById (vehicleId){
        // Fetch vehicle data from Firestore using the vehicleId
        const vehicleRef = doc(db, "Vehicle", vehicleId);
        const vehicleSnap = await getDoc(vehicleRef);
        if (vehicleSnap.exists()) {
            return Vehicle.fromFirestore(vehicleSnap);
        } else {
            console.log("No such vehicle!");
            return null;
        }
    }

    // filter vehicles by search keyword
    async filterVehiclesByAddress(searchKeyword) {
        console.log("+++++++++++");
        console.log(`Search: ${searchKeyword}`);
    
        try {
            // Convert searchKeyword to lowercase
            const lowerCaseSearchKeyword = searchKeyword.toLowerCase();
    
            // Fetch all vehicle data from Firestore
            const querySnapshot = await getDocs(collection(db, "Vehicle"));
    
            const vehicles = [];
            querySnapshot.forEach((doc) => {
                const vehicle = Vehicle.fromFirestore(doc);
                // Convert address to lowercase for comparison
                const lowerCaseAddress = vehicle.pickupLocation.address.toLowerCase();
                // Check if the lowerCaseAddress contains the lowerCaseSearchKeyword
                if (lowerCaseAddress.includes(lowerCaseSearchKeyword)) {
                    vehicles.push(vehicle);
                }
            });
    
            console.log(vehicles);
            return vehicles;
        } catch (error) {
            console.error("Error fetching vehicles:", error);
            return [];
        }
    }
    

}

const vehicleController = new VehicleController();
export { vehicleController };
