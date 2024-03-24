import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"


export const createStory =async (req, res) => {
    try {
        const userId = req.user._id
        const { text } = req.body

        const user = await UserModel.findById(userId)
        if(!user) {
            return handleValidationError(res , "User not found" , 404) 
        }
        
        let image = ''
        if (req.file) {
            image = process.env.URL + `/uploads/${req.file.filename}`
        }

        //creating the new story
        const newStory = await StoryModel.create({
            user: userId,
            image,
            text
        })

        res.status(200).json({
            success : true,
            message : "Story created successfully",
            newStory: newStory
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the post', error, 500);
    }
}