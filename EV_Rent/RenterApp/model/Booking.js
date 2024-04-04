/* eslint-disable no-unused-vars */
class Booking{
    constructor(id, renter, vehicle, bookingDate, status, confirmationCode){
        this.id = id;
        this.renter = renter;
        this.vehicle = vehicle;
        this.bookingDate = bookingDate;
        this.status = status;
        this.confirmationCode = confirmationCode;
    }

    toJSON(){
        return {
            id: this.id,
            renter: this.renter,
            vehicle: this.vehicle,
            bookingDate: this.bookingDate,
            status: this.status,
            confirmationCode: this.confirmationCode
        }
    }

    static fromFirestore(doc){
        const data = doc.data();
        return new Booking(doc.id, data.renter, data.vehicle, data.bookingDate, data.status, data.confirmationCode);
    }
}

export { Booking };
