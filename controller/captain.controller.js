import captainModel from "../models/captain.model.js";
import createCaptain from "../services/captain.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";

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
        res.header("Authorization", `Bearer ${token}`);
        res.cookie("token", token, { httpOnly: true });
        res.status(201).json({token, captain});
    } catch (err) {
        next(err);
    }
}

const getCaptainProfile = async (req, res) => {
    res.status(200).json(req.captain);
}

const loginCaptain = async (req, res, next) => {
    const { email, password } = req.body;
    const captain = await captainModel.findOne({ email }).select('+password');
    if (!captain) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
    const token = await captain.generateAuthToken();
    res.header("Authorization", `Bearer ${token}`);
    res.cookie("token", token)
    res.status(200).json({ captain, token });
}

const logoutCaptain = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: 'Logout successful' });

}

export { registerCaptain, loginCaptain, getCaptainProfile, logoutCaptain };