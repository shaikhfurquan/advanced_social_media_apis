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


export const followUser = async (req, res) => {
    try {
       // which user we want to follow so mentioned in the req.params(userId)
        const { userId } = req.params

        //login user
        const { _id } = req.user;


        console.log(userId , _id);
        if (userId === _id) {
            return handleValidationError(res, "You cannot follow useself", 400)
        }

        const userToFollow = await UserModel.findById(userId)
        const loggedInUser = await UserModel.findById(_id)


        // console.log("userToFollow==>" , userToFollow);
        // console.log("loggedinuser==>" , loggedInUser);

        if (!userToFollow || !loggedInUser) {
            return handleValidationError(res, "User not found", 400)
        }

        // if user already followed then
        if (loggedInUser.following.includes(userId)) {
            return handleValidationError(res, "Already followed", 400)
        }

        //follow user
        loggedInUser.following.push(userId)
        userToFollow.followers.push(_id)

        // saving the both users
        await loggedInUser.save()
        await userToFollow.save()

        res.status(200).json({
            success : true,
            message : "successfully followed user"
        })

    } catch (error) {

        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id')
        }
        handleCatchError(res, 'Error updating user', error, 500);
    }

}