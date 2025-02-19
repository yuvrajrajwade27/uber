import { hash } from "bcrypt";
import captainModel from "../models/captain.model.js";
import createCaptain from "../services/captain.service.js";

const registerCaptain = async (req, res, next) => {
    try {
        const { firstname, lastname, email, password, vehicle } = req.body;
        const isCaptainAlreadyExist = await captainModel.findOne({email});
        if (isCaptainAlreadyExist) {
            return res.status(400).json({message: "Captain already exist"});
        }
        const hashPassword = await captainModel.hashPassword(password);
        const captain = await createCaptain({
            firstname,
            lastname,
            email,
            password: hashPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });
        const token = await captain.generateAuthToken();
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({token, captain});
    } catch (err) {
        next(err);
    }
}

export default registerCaptain;;