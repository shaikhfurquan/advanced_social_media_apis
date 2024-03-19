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


        console.log(userId, _id);
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
            success: true,
            message: "successfully followed user"
        })

    } catch (error) {

        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id')
        }
        handleCatchError(res, 'Error follow user', error, 500);
    }
    
}



export const unfollowUser = async (req, res) => {
    try {
        // which user we want to un-follow so mentioned in the req.params(userId)
        const { userId } = req.params
        
        //login user
        const { _id } = req.user;
        
        const userToUnfollow = await UserModel.findById(userId)
        const loggedInUser = await UserModel.findById(_id)
        
        
        // console.log("userTounFollow==>" , userToUnfollow);
        // console.log("loggedinuser==>" , loggedInUser);
        
        if (!userToUnfollow || !loggedInUser) {
            return handleValidationError(res, "User Not found", 404)
        }
        
        // if not following the user then we will check this
        if (!loggedInUser.following.includes(userId)) {
            return handleValidationError(res, "Not following this user", 400)
        }
        
        // if following the user then we will filter out from the following array
        loggedInUser.following = loggedInUser.following.filter(id => id.toString() !== userId)
        userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== _id)
        
        //saving the users
        await loggedInUser.save()
        await userToUnfollow.save()
        
        res.status(200).json({
            success: true,
            message: "successfully Un-followed user"
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id')
        }
        handleCatchError(res, 'Error un-follow user', error, 500);
    }
    
}



export const blockUser = async (req, res) => {
    try {
        // which user we want block so mentioned in the req.params(userId)
        const { userId } = req.params
        
        //login user
        const { _id } = req.user;

        if(userId === _id){
            return handleValidationError(res, "You cannot block yourself.", 400)
        }
        
        
        const userToBlock = await UserModel.findById(userId)
        const loggedInUser = await UserModel.findById(_id)
        
        if(!userToBlock || !loggedInUser){
            return handleValidationError(res, "User not found.", 400)
        }
        
        // if the user is logged exists in the block list then
        if(loggedInUser.blockList.includes(userId)){
            return handleValidationError(res , "User already in the block list", 409)
        }
        
        // else we will push in the block list
        loggedInUser.blockList.push(userId)
        
        
        //if the user is present in the following/followers list then we will also remove the user from that
        loggedInUser.following = loggedInUser.following.filter(id =>id.toString() !== userId)
        userToBlock.followers = userToBlock.followers.filter(id =>id.toString() !== _id)
        
        
        //saving the users
        await loggedInUser.save()       
        await userToBlock.save()

        res.status(200).json({
            success: true,
            message: "successfully blocked user"
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id')
        }
        handleCatchError(res, 'Error block user', error, 500);
    }

}



export const unblockUser = async (req, res) => {
    try {
        // which user we want Un-block so mentioned in the req.params(userId)
        const { userId } = req.params
        
        //login user
        const { _id } = req.user;

        if(userId === _id){
            return handleValidationError(res, "You cannot Un-block yourself.", 400)
        }
        
        const userToUnblock = await UserModel.findById(userId)
        const loggedInUser = await UserModel.findById(_id)

        if(!userToUnblock || !loggedInUser){
            return handleValidationError(res , "User not found.", 400)
        }
       

        if(!loggedInUser.blockList.includes(userId)){
            return handleValidationError(res , "Not blocked this user" , 400)
        }

        loggedInUser.blockList = loggedInUser.blockList.filter(id => id.toString() !== userId)
        
        //saving the user
        await loggedInUser.save()
        res.status(200).json({
            success: true,
            message: "successfully Un-blocked user"
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id')
        }
        handleCatchError(res, 'Error un-block user', error, 500);
    }

}
