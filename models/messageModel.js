import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({

    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text : {
        type : String,
        required: [true , 'Message text is required']
    }

}, { timestamps: true });

const MessageModel = mongoose.model('Message', messageSchema);

export default MessageModel