import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"

export const createPost = async (req, res) => {
    try {
        const { caption } = req.body
        const {_id} = req.user
        const user = await UserModel.findById(_id)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }
        
        //create a new post
        const newPost = await PostModel.create({
            user : _id,
            caption : caption
        })
        
        // pushing the post to the user posts(array)
        user.posts.push(newPost._id)
        await user.save()
        
        res.status(200).json({
            success: true,
            message: "Post created successfully", 
            post : newPost
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creaing the post', error, 500);

    }
}