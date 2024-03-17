import bcrypt from "bcrypt"
import UserModel from '../models/userModel.js'

export const registerUser = async (req, res) => {
    try {
        const { email, userName, password } = req.body
        // check if the user is already registered or not
        const existingUser = await UserModel.findOne({ $or: [{ userName }, { email }] })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "UserName and email already exists"
            })
        }

        // if not existing user then will create a new one with hashed password
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await UserModel.create({ ...req.body, password: hashPassword })

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            newUser: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while registering user",
            error: error.message || error
        })

    }
}


export const loginUser = async (req, res) => {
    try {

        const { userName, email, password } = req.body
        let user
        if (email) {
            user = await UserModel.findOne({ email })
        } else {
            user = await UserModel.findOne({ userName })

        }
        if (!user) {
            return res.status(404).josn({
                success: false,
                message: "User not found, Please register first."
            })
        }

        // if user is there then we need to verify his password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).josn({
                success: false,
                message: "Invalid Credentials"
            })
        }

        res.status(200).json({
            success: true,
            message: `Welcome ${user.userName}`,
            user: user

        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while login user",
            error: error.message || error
        })
    }
}