import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"

export const createPost = async (req, res) => {
    try {
        const { caption } = req.body
        const { _id } = req.user
        const user = await UserModel.findById(_id)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }

        //create a new post
        const newPost = await PostModel.create({
            user: _id,
            caption: caption
        })

        // pushing the post to the user posts(array)
        user.posts.push(newPost._id)
        await user.save()

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            post: newPost
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the post', error, 500);

    }
}

// generating the file Url
const generateFileUrl = (filename) => {
    return process.env.URL + `/uploads/${filename}`
}


export const createPostWithImages = async (req, res) => {
    try {
        const { caption } = req.body
        const { _id } = req.user
        const files = req.files

        const user = await UserModel.findById(_id)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }

        //getting the imageUrl array from files
        const imageUrls = files.map(file => generateFileUrl(file.filename))

        //creatin the new post
        const newPost = await PostModel.create({
            user: _id,
            caption: caption,
            image: imageUrls
        })

        // pushing the posts to the user posts array
        user.posts.push(newPost._id)

        //saving the user
        await user.save()
        res.status(201).json({
            success: true,
            message: "Post created successfully along with images",
            post: newPost
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the post with images', error, 500);

    }
}



export const updatePost = async (req, res) => {
    try {

        const { postId } = req.params
        const { caption } = req.body;

        const postToUpdate = await PostModel.findById(postId)
        if (!postToUpdate) {
            return handleValidationError(res, "Post not found", 404)
        }

        const updatedPost = await PostModel.findByIdAndUpdate(postId , {caption} , {new : true})
        await postToUpdate.save()


        res.status(201).json({
            success: true,
            message: "Post caption updated successfully",
            post: updatedPost
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while updating the post caption', error, 500);

    }
}



export const getAllPosts = async (req, res) => {
    try {

        const user = await UserModel.findById(req.params.userId)
        console.log(user);
        if (!user) {
            return handleValidationError(res, 'User not found', 404);
        }

        // finding the block users by Id(we dont want to show to block users)
        const blockUsersIds = user.blockList.map(id => id.toString())

        // showing the posts excluding with block users
        const allPosts = await PostModel.find({ user: { $nin: blockUsersIds } }).populate("user", "userName fullName profilePicture")

        res.status(201).json({
            success: true,
            message: "Post fetched successfully",
            post: allPosts
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while getting the posts', error, 500);

    }
}



export const getUserPosts = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user._id)

        if (!user) {
            return handleValidationError(res, 'User not found', 404);
        }

        const userPosts = await PostModel.find({ user: req.user._id })

        res.status(201).json({
            success: true,
            message: "Post fetched successfully",
            post: userPosts
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while getting user posts', error, 500);

    }
}


export const deletePost = async (req, res) => {
    try {

        const { postId } = req.params
        const postToDelete = await PostModel.findById(postId)
        if (!postToDelete) {
            return handleValidationError(res, 'Post not found', 404);
        }
    
        // Verify if the authenticated user is the owner of the post
        if (postToDelete.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to delete this post, Owner can delete post',
            });
        }

        //finding the user associated with this post
        const user = await UserModel.findById(postToDelete.user)
        if (!user) {
            return handleValidationError(res, 'User not found', 404);
        }

        console.log(user);
        // deleting the posts from the user posts
        user.posts = user.posts.filter(postId => postId.toString() !== postToDelete._id.toString())
        console.log(user.posts);

        await user.save()
        await postToDelete.deleteOne()

        res.status(201).json({
            success: true,
            message: "Post deleted successfully",
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while getting user posts', error, 500);

    }
}


