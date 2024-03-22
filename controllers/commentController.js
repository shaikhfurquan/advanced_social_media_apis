import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"


export const createComment = async (req, res) => {
    try {

        const userId = req.user._id
        const { postId, text } = req.body

        //finding the post
        const post = await PostModel.findById(postId)
        if(!post){
            return handleValidationError(res, "Post not found" , 404)
        }

        //finding user
        const user = await UserModel.findById(userId)
        if(!user){
            return handleValidationError(res, "User not found" , 404)
        }

        const newComment = await CommentModel.create({
            user : userId,
            post : postId,
            text
        })

        //pushing the commentId to the post comment(array)
        post.comments.push(newComment._id)
        await post.save()

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment : newComment
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the comment', error, 500);

    }
}