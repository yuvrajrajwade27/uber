import userModel from "../models/userModel.js";
import createUser from "../services/user.service.js";
import blacklistTokenModel from "../models/blacklistToken.model.js";



const registerUser = async (req, res) => {
    const { firstname, email, password, lastname} = req.body;
    const hashPassword = await userModel.hashPassword(password);    
    const user = await createUser({
        firstname,
        lastname,
        email,
        password: hashPassword
    });
    const token = await user.generateAuthToken();
    res.cookie("token", token)
    res.status(201).json({user, token});
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');
    if (!user) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid login credentials' });
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token)
    res.status(200).json({ user, token });
}

const getUserProfile = async (req, res) => {
    res.status(200).json(req.user);
}

const logoutUser = async (req, res) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.clearCookie("token");
    res.status(200).json({ message: 'Logout successful' });

}



export {registerUser, loginUser, getUserProfile, logoutUser};