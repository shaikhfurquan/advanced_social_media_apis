import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [3, 'Password must be at least 8 characters'],
        maxlength: [60, 'Password cannot exceed 50 characters'],
    },
    fullName: {
        type: String,
        required: [true, 'Full name is required'],
        trim: true,
    },
    bio: {
        type: String,
        trim: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    coverPicture: {
        type: String,
        default: '',
    },

    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',

    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }],
    blockList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',

    }],
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel