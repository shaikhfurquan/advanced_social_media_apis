import UserModel from "../models/userModel.js"
import PostModel from '../models/postModel.js'
import CommentModel from '../models/commentModel.js'
import StoryModel from '../models/storyModel.js'
import { handleCastError, handleCatchError, handleValidationError } from "../helpers/handleError.js"


export const createComment = async (req, res) => {
    try {

        const userId = req.user._id
        const { postId, text } = req.body

        //finding the post
        const post = await PostModel.findById(postId)
        if (!post) {
            return handleValidationError(res, "Post not found", 404)
        }

        //finding user
        const user = await UserModel.findById(userId)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }

        const newComment = await CommentModel.create({
            user: userId,
            post: postId,
            text
        })

        //pushing the commentId to the post comment(array)
        post.comments.push(newComment._id)
        await post.save()

        res.status(200).json({
            success: true,
            message: "Comment added successfully",
            comment: newComment
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the comment', error, 500);

    }
}



export const createCommentReply = async (req, res) => {
    try {

        const { commentId } = req.params
        const userId = req.user._id
        const { text } = req.body

        //finding the parent comment
        const parentComment = await CommentModel.findById(commentId)
        if (!parentComment) {
            return handleValidationError(res, 'Parent Comment not found', 404)
        }

        //finding user
        const user = await UserModel.findById(userId)
        if (!user) {
            return handleValidationError(res, "User not found", 404)
        }

        const reply = {
            text: text,
            user: userId
        }
        parentComment.replies.push(reply)
        await parentComment.save()

        res.status(200).json({
            success: true,
            message: "Reply on Comment added successfully",
            reply: reply
        })

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while creating the comment', error, 500);

    }
}


export const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;
        const { text } = req.body;

        // Find the comment
        const commentToUpdate = await CommentModel.findById(commentId);
        if (!commentToUpdate) {
            return handleValidationError(res, 'Comment not found', 404);
        }

        // Verify if the authenticated user is the owner of the comment
        if (commentToUpdate.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You are not authorized to update this comment, Onwer only',
            });
        }

        // Update the comment
        const updatedComment = await CommentModel.findByIdAndUpdate(commentId, { text }, { new: true });

        res.status(200).json({
            success: true,
            message: 'Comment updated successfully',
            updatedComment,
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while updating the comment', error, 500);
    }
};


export const updateReplyComment = async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const userId = req.user._id;
        const { text } = req.body;

        // Find the comment
        const parentComment = await CommentModel.findById(commentId);
        if (!parentComment) {
            return handleValidationError(res, 'Comment not found', 404);
        }


        //getting replies array(index)
        const replyIndex = parentComment.replies.findIndex((reply) => reply._id.toString() === replyId)
        console.log(replyIndex);

        if (replyIndex === -1) {
            return handleValidationError(res, 'Reply comment not found', 404);
        }

        //validating the user
        if (parentComment.replies[replyIndex].user.toString() !== userId) {
            return handleValidationError(res, "you are not allowed to update this comment", 400)
        }

        parentComment.replies[replyIndex].text = text
        await parentComment.save()

        res.status(200).json({
            success: true,
            message: 'Reply Comment updated successfully',
            parentComment: parentComment
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while updating the reply on comment', error, 500);
    }
};


//Making function for user that populate the user comment details
const pupulateUserDetails = async (comments) => {
    // Also populate the reqply comments
    for (const comment of comments) {
        console.log('comment==>' , comment);
        await comment.populate("user", "userName fullName profilePicture")
        if (comment.replies.length > 0) {
            await comment.populate("replies.user", "userName fullName profilePicture")
        }
    }
}

export const getAllCommentOnPost = async (req, res) => {
    try {
        const { postId } = req.params

        const post = await PostModel.findById(postId)
        if (!post) {
            return handleValidationError(res, 'Post not found', 404)
        }

        let commentsOnPost = await CommentModel.find({ post: postId })
        await pupulateUserDetails(commentsOnPost)

        res.status(200).json({
            success: true,
            message: 'Comments fetched successfully',
            commentsOnPost : commentsOnPost
        });

    } catch (error) {
        if (error.name === 'CastError') {
            return handleCastError(res, 'Invalid Id');
        }
        handleCatchError(res, 'Error while updating the reply on comment', error, 500);
    }
}