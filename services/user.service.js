import userModel from "../models/userModel.js";


const createUser = async ({ firstname, email, password, lastname}) =>{
    if (!firstname || !email || !password) {
        throw new Error("All fields are required");
    }
    const user = await userModel.create({
        firstname,
        lastname,
        email,
        password
    });

    return user
}

export default createUser;