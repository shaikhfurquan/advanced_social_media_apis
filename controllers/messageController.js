import UserModel from "../models/userModel.js"
import MessageModel from '../models/messageModel.js'
import ConversationModel from '../models/conversationModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"


export const createMessage = async (req, res) => {
    try {
        const newMessage = new MessageModel(req.body)
        const savedMessage = await newMessage.save()

        res.status(20).json({
            success: true,
            message: "Message created successfully",
            savedMessage: savedMessage
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the message', error, 500);
    }
}


export const getMessage= async (req, res) => {
    try {
        
        const message = await MessageModel.find({
            conversationId : req.params.conversationId
        })
        if(!message){
            return handleValidationError(res , 'Message not found' ,404 )
        }

        res.status(200).json({
            success: true,
            message: "Message fetched successfully",
            message : message
        })
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while fetching the messsage', error, 500);
    }
}

