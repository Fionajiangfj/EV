/* eslint-disable no-unused-vars */
class Vehicle{
    constructor(id, owner ,name, photo, capacity, color, license_plate, pickup_address, price, latitude, longitude){
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.photo = photo;
        this.capacity = capacity;
        this.color = color;
        this.license_plate = license_plate;
        this.pickup_address = pickup_address;
        this.price = price
        this.latitude = latitude;
        this.longitude = longitude;
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            owner: this.owner,
            photo: this.photo,
            capacity: this.capacity,
            color: this.color,
            license_plate: this.license_plate,
            pickup_address: this.pickup_address,
            price: this.price,
            latitude: this.latitude,
            longitude: this.longitude
        }
    }

    static fromFirestore(doc){
        const data = doc.data();
        return new Vehicle(doc.id, data.name, data.photo, data.owner, data.capacity, data.color, data.license_plate, data.pickup_address, data.price, data.latitude, data.longitude);
    }
}