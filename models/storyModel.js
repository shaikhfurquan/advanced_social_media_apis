import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true,
        trim : true
    },
    image: {
        type: String,
        required: false
    },
    createdAt: {
        type : Date,
        default : Date.now
    }

}, { timestamps: true });

const StoryModel = mongoose.model('Story', storySchema);

export default StoryModel