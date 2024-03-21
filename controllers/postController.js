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
        if(!postToUpdate){
            return handleValidationError(res , "Post not found" , 404)
        }

        // if caption is falsy (such as null, undefined, or an empty string), it keeps the existing value of postToUpdate.caption.
        postToUpdate.caption = caption || postToUpdate.caption
        await postToUpdate.save()


        res.status(201).json({
            success: true,
            message: "Post caption updated successfully",
            post: postToUpdate
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while updating the post caption', error, 500);

    }
}