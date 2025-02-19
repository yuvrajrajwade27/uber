import captainModel from "../models/captain.model.js";

const createCaptain = async ({firstname, lastname, email, password, vehicle}) => {
    if (!firstname || !email || !password || !vehicle.color || !vehicle.plate || !vehicle.capacity || !vehicle.vehicleType) {
        res.status(400).json({message: "All fields are required"});
        return;
    }
    const captain = await captainModel.create({
        firstname,
        lastname,
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        }
    });
    return captain;
}

export default createCaptain;