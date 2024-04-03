import { addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from "../firebaseConfig";
import { Booking } from '../model/Booking';
let instance = null;
class BookingController{
    constructor(){
        if(!instance){
            instance = this;
        }
        return instance;
    }
    async addBooking(booking,callback){
        try{
            console.log(booking.toJSON())
            const bookingRef = collection(db, "Booking")
            await addDoc(bookingRef, booking.toJSON());
            callback(null, "success");
        }
        catch(error){
            console.error("Error adding document: ", error);
            callback(error);
        }

    }

    fetchUserBookings(userId, onBookingsUpdated) {
        try {
            // Correct reference to the collection for querying
            const bookingsRef = collection(db, "Booking");
            // Fixed the comparison operator from '===' to '=='
            const q = query(bookingsRef, where('renter', '==', userId));
    
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const bookings = [];
                querySnapshot.forEach((doc) => {
                    // Assuming Booking.fromFirestore is correctly implemented
                    const booking = Booking.fromFirestore(doc);
                    booking.bookingDate = booking.bookingDate.toDate();
                    bookings.push(booking);
                });
                onBookingsUpdated(bookings);
            });
    
            return unsubscribe; // Return the unsubscribe function to allow caller to unsubscribe from updates
        } catch (error) {
            console.error("Error fetching bookings: ", error);
            throw new Error("Failed to fetch bookings");
        }
    }

}

const bookingController = new BookingController();
export { bookingController };
