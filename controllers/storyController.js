import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"


export const createStory = async (req, res) => {
    try {
        const userId = req.user._id
        const { text } = req.body

        const user = await UserModel.findById(userId)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
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
            success: true,
            message: "Story created successfully",
            newStory: newStory
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the story', error, 500);
    }
}

//current user
export const getAllStory = async (req, res) => {
    try {
        const userId = req.user._id


        const user = await UserModel.findById(userId)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }

        // taking the story of those users that whom the user is follwing
        const followingUsers = user.following
        const stories = await StoryModel.find({ user: { $in: followingUsers } }).populate("user", "fullName userName userName profilePicture")

        res.status(200).json({
            success: true,
            message: "Story fetched successfully",
            stories: stories
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while getting the story', error, 500);
    }
}

//other user story
export const getUserStory = async (req, res) => {
    try {
        const userId = req.params.userId
        const user = await UserModel.findById(userId)

        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }
        const story = await StoryModel.find({ user: userId }).populate("user", "fullName userName profilePicture")

        if (!story) {
            return handleValidationError(res, "Story not found", 404)
        }

        res.status(200).json({
            success: true,
            message: "Story fetched successfully",
            story: story
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while getting the story', error, 500);
    }
}


export const deleteStory = async (req, res) => {
    try {
        const userId = req.user._id
        const storyId = req.params.storyId
        const user = await UserModel.findById(userId)

        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }

        const story = await StoryModel.findById(storyId)
        if (!story) {
            return handleValidationError(res, "Story not found", 404)
        }

        // Verify if the authenticated user is the owner of the story
        if (story.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to delete this story. Owner only.",
            });
        }

        await StoryModel.findByIdAndDelete(storyId)
        res.status(200).json({
            success: true,
            message: "Story deleted successfully",
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while deleting the story', error, 500);
    }
}