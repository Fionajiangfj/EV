/* eslint-disable no-unused-vars */
class Booking{
    constructor(id, renter, vehicle, date, status, confirmationCode){
        this.id = id;
        this.renter = renter;
        this.vehicle = vehicle;
        this.date = date;
        this.status = status;
        this.confirmationCode = confirmationCode;
    }

    toJSON(){
        return {
            id: this.id,
            renter: this.renter,
            vehicle: this.vehicle,
            date: this.date,
            status: this.status,
            confirmationCode: this.confirmationCode
        }
    }

    fromFirestore(doc){
        const data = doc.data();
        return new Booking(doc.id, data.renter, data.vehicle, data.date, data.status, data.confirmationCode);
    }
}