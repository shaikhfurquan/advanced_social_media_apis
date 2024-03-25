import UserModel from "../models/userModel.js"
import StoryModel from '../models/storyModel.js'
import MessageModel from '../models/messageModel.js'
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


export const getConversation = async (req, res) => {
    try {
        const conversations= await ConversationModel.find({
            participants : {$in : [req.params.userId]}
        })

        if(!conversations){
            return handleValidationError(res , "Conversation not found" , 404)
        }

        res.status(200).json({
            success: true,
            message: "Conversation fetched successfully",
            conversations : conversations
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the Conversation', error, 500);
    }
}


export const getTwoUserConversation = async (req, res) => {
    try {
        const conversations= await ConversationModel.find({
            participants : {$all : [req.params.firstUserId , req.params.secondUserId]}
        })

        if(!conversations){
            return handleValidationError(res , "Conversation not found" , 404)
        }
        
        res.status(200).json({
            success: true,
            message: "Conversation fetched successfully",
            conversations : conversations
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the Conversation', error, 500);
    }
}


export const deleteConversation = async (req, res) => {
    try {
        const conversationId = req.params.conversationId
        const conversation = await ConversationModel.findById(conversationId)
        if(!conversation){
            return handleValidationError(res , 'conversation not found' , 404)
        }

        await ConversationModel.deleteOne({_id : conversationId})
        await MessageModel.deleteMany({conversationId : conversationId})

        res.status(200).json({
            success: true,
            message: "Conversation deleted successfully",
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while deleting the Conversation', error, 500);
    }
}

