/* eslint-disable no-unused-vars */
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Update the import path to your firebase configuration
import { Vehicle } from '../model/Vehicle'; // Adjust the import path to your Vehicle class

class VehicleController {
    static async fetchVehicles() {
        try {
            const querySnapshot = await getDocs(collection(db, 'vehicles'));
            const vehicles = [];
            querySnapshot.forEach((doc) => {
                const vehicle = Vehicle.fromFirestore(doc);
                vehicles.push(vehicle);
            });
            return vehicles;
        } catch (error) {
            console.error("Error fetching vehicles: ", error);
            throw new Error("Failed to fetch vehicles");
        }
    }
}

export { VehicleController };
