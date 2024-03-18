import bcrypt from "bcrypt"
import UserModel from '../models/userModel.js'
import  generateToken  from "../helpers/generateToken.js"
import { handleCatchError, handleValidationError } from "../helpers/handleError.js"
// import { CustomError } from "../middlewares/errorHandler.js"

export const registerUser = async (req, res, next) => {
    try {
        const { email, userName, password } = req.body
        // check if the user is already registered or not
        const existingUser = await UserModel.findOne({ $or: [{ userName }, { email }] })

        if (existingUser) {
           return handleValidationError(res , "UserName and email already exists" , 400)
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
       handleCatchError(res , "Error registering user" , error , 500)
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
            return handleValidationError(res , "User not found, Please register first."  , 404)
        }

        // if user is there then we need to verify his password
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return handleValidationError(res , "Invalid Credentials" , 400)
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
       handleCatchError(res ,"Error while login user" , error)
    }
}


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token', { sameSite: "none", secure: true }).json({
            success: true,
            message: "Logged out success"
        });
    } catch (error) {
       handleCatchError(res , "Error while logout user" , error , 500)
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
       handleCatchError(res , "Error while getting user profile" , error , 500)
    }
}