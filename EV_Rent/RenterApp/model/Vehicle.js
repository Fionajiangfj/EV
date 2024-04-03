/* eslint-disable no-unused-vars */
class Vehicle{
    constructor(id, fuel, owner ,vehicleName, vehiclePhoto, capacity, licensePlate, pickupLocation, price, type){
        this.id = id;
        this.fuel = fuel;
        this.vehicleName = vehicleName;
        this.owner = owner;
        this.vehiclePhoto = vehiclePhoto;
        this.capacity = capacity;
        this.licensePlate = licensePlate;
        this.pickupLocation = pickupLocation;
        this.price = price;
        this.type = type;
    }

    toJSON(){
        return {
            id: this.id,
            fuel: this.fuel,
            vehicleName: this.vehicleName,
            owner: this.owner,
            vehiclePhoto: this.vehiclePhoto,
            capacity: this.capacity,
            licensePlate: this.licensePlate,
            pickupLocation: this.pickupLocation,
            price: this.price,
            type: this.type
        }
    }

    static fromFirestore(doc){
        const data = doc.data();
        return new Vehicle(doc.id, data.fuel, data.owner, data.vehicleName, data.vehiclePhoto, data.capacity, data.licensePlate, data.pickupLocation, data.price, data.type);
    }
}
export { Vehicle };
