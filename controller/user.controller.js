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


export default registerUser;