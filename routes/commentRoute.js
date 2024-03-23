
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createComment, createCommentReply, updateComment, updateReplyComment } from '../controllers/commentController.js'

const commentRouter = express.Router()

// create comment
commentRouter.post('/add' , isAuthenticated , createComment)


// create comment reply
commentRouter.post('/add/reply/:commentId' , isAuthenticated , createCommentReply)


// update comment
commentRouter.put('/update/:commentId' , isAuthenticated , updateComment)


// update reply comment
commentRouter.put('/update/:commentId/replies/:replyId' , isAuthenticated , updateReplyComment)

export default commentRouter