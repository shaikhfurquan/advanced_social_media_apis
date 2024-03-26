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

        const updatedPost = await PostModel.findByIdAndUpdate(postId, { caption }, { new: true })
        await postToUpdate.save()


        res.status(200).json({
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

        res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            postCount : allPosts.length,
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

        res.status(200).json({
            success: true,
            message: "Post fetched successfully",
            postCount : userPosts.length,
            post: userPosts
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while getting user posts', error, 500);

    }
}


export const getPostOfFollowing = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user._id);
        if(!user){
            return handleValidationError(res , 'User not found' , 404);
        }
        const postOfFollowing = await PostModel.find({
            user: {
                $in: user.following
            }
        })

        if(!postOfFollowing){
            return handleValidationError(res , 'No post from following users' , 404)
        }
        console.log(postOfFollowing.length);
        res.status(200).json({
            success: true,
            postCount: postOfFollowing.length,
            postOfFollowing : postOfFollowing
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching the posts of the following",
            error: error.message
        })
    }
}


export const getPostOfFollowers = async (req, res) => {
    try {

        const user = await UserModel.findById(req.user._id);
        if(!user){
            return handleValidationError(res , 'User not found' , 404);
        }
        const postOfFollowers = await PostModel.find({
            user: {
                $in: user.followers
            }
        })

        if(!postOfFollowers){
            return handleValidationError(res , 'No post from followers users' , 404)
        }
        console.log(postOfFollowers.length);
        res.status(200).json({
            success: true,
            postCount: postOfFollowers.length,
            postOfFollowers : postOfFollowers
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching the posts of the followers",
            error: error.message
        })
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

        res.status(200).json({
            success: true,
            message: "Post deleted successfully",
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while deleting user posts', error, 500);

    }
}


export const likePost = async (req, res) => {
    try {

        const { postId } = req.params
        const userId = req.user._id
        

        //findinbg the post
        const post = await PostModel.findById(postId)
        if(!post) {
            return handleValidationError(res , "Post not found" , 404);
        }

        //finding the user
        const user = await UserModel.findById(userId)
        if(!user){
            return handleValidationError(res, "User not found" , 404);
        }

        // checking whether the post is already like or not in the post like(array)
        if(post.likes.includes(userId)){
            return handleValidationError(res , "User already like this post" , 409);
        }

        // if user not like the post then
        post.likes.push(userId);
        await post.save();


        res.status(200).json({
            success: true,
            message: "Like the post successfully",
            post: post
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while like post', error, 500);

    }
}


export const UnlikePost = async (req, res) => {
    try {

        const { postId } = req.params
        const userId = req.user._id
        

        //findinbg the post
        const post = await PostModel.findById(postId)
        if(!post) {
            return handleValidationError(res , "Post not found" , 404);
        }

        //finding the user
        const user = await UserModel.findById(userId)
        if(!user){
            return handleValidationError(res, "User not found" , 404);
        }

        // checking whether the post is already like or not in the post like(array)
        if(!post.likes.includes(userId)){
            return handleValidationError(res , "You have not like the post, first like" , 409);
        }

        // removing the userId from the post likes(array)
        post.likes = post.likes.filter(id => id.toString() !== userId)
        // console.log(post.likes);
        await post.save();


        res.status(200).json({
            success: true,
            message: "Un-Like the post successfully",
            post: post
        })


    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while un-like post', error, 500);

    }
}