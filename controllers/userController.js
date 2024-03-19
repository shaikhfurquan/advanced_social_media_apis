import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"
import UserModel from "../models/userModel.js"


export const getSingleUser = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id, { password: 0 })
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }
        res.status(200).json({
            success: true,
            message: `${user.userName} profile fetched`,
            user: user
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error registering user', error, 500);

    }
}


export const updateUser = async (req, res) => {
    try {
        // console.log(req.user);
        const user = await UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true }).select('-password');

        res.status(200).json({
            success: true,
            message: "user updated successfully",
            user: user
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id')
        }
        handleCatchError(res, 'Error updating user', error, 500);
    }
}

