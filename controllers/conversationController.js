import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import ConversationModel from '../models/conversationModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"


export const createNewConversation = async (req, res) => {
    try {
        let newConversation;
        if (req.body.firstUser !== req.body.secondUser) {
            newConversation = await ConversationModel({
                participants: [req.body.firstUser, req.body.secondUser]
            })
        } else {
            return handleValidationError(res, "Sender and Reciever can't be the same")
        }

        const savedConversation = await newConversation.save()
        res.status(200).json({
            success: true,
            message: "Conversation created successfully",
            savedConversation: savedConversation
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the Conversation', error, 500);
    }
}

