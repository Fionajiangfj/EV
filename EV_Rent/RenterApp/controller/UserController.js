/* eslint-disable no-unused-vars */
import { collection, doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { Booking } from '../model/Booking';

class UserController {
    static fetchUserBookings(userId, onBookingsUpdated) {
        // Fetch user data (if needed for additional context in your app)
        const userRef = doc(db, "users", userId);
        getDoc(userRef).then(userSnap => {
            if (!userSnap.exists()) {
                console.error("No user found with ID:", userId);
                onBookingsUpdated([]);
                return;
            }
            
            // Real-time listener for bookings
            const bookingsRef = collection(db, "bookings");
            const q = query(bookingsRef, where("renter", "==", userId));
            onSnapshot(q, async (querySnapshot) => {
                const bookings = [];
                for (const doc of querySnapshot.docs) {
                    const bookingData = Booking.fromFirestore(doc);
                    bookings.push(bookingData);
                }

                onBookingsUpdated(bookings);
            });
        }).catch(error => {
            console.error("Error fetching user bookings:", error);
            throw error;
        });
    }
}

export { UserController };
