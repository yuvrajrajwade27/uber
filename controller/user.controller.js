import userModel from "../models/userModel.js";
import createUser from "../services/user.service.js";



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
    res.status(200).json({ user, token });
}



export {registerUser, loginUser};