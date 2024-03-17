import bcrypt from "bcrypt"
import UserModel from '../models/userModel.js'
import  generateToken  from "../helpers/generateToken.js"

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
            return res.status(404).json({
                success: false,
                message: "User not found, Please register first."
            })
        }

        // if user is there then we need to verify his password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({
                success: false,
                message: "Invalid Credentials"
            })
        }

        user.password = undefined
        const token = generateToken(user)

        // storing the token into cookies
        const jwtOptions = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.cookie('token', token, jwtOptions).status(200).json({
            success: true,
            message: `Welcome ${user.userName}`,
            token: token,
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


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', { sameSite: "none", secure: true }).json({
            success: true,
            message: "Logged out success"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while logout user",
            error: error.message || error
        })

    }
}


export const getCurrentUser = async (req, res) => {
    try {
        // console.log(req.user);
        const currentUser = await UserModel.findById(req.user._id).select('-password')
        res.status(200).json({
            success : true,
            message : "User profile fetch successfully",
            currentUser : currentUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error while getting user profile",
            error: error.message || error
        })

    }
}