/* eslint-disable no-unused-vars */
class User{
    constructor(id, email, password, role, name, photo, vehicle, booking){
        this.id = id;
        this.email = email;
        this.password = password;
        this.role = role;
        this.name = name;
        this.photo = photo;
        this.vehicle = vehicle;
        this.booking = booking;
    }

    toJson(){
        return {
            id: this.id,
            email: this.email,
            password: this.password,
            role: this.role,
            name: this.name,
            photo: this.photo,
            vehicle: this.vehicle,
            booking: this.booking
        }
    }

    fromFirestore(doc){
        const data = doc.data();
        return new User(doc.id, data.email, data.password, data.role, data.name, data.photo, data.vehicle, data.booking);
    }
}

export { User };
