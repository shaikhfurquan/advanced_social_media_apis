
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createComment, createCommentReply } from '../controllers/commentController.js'

const commentRouter = express.Router()

// create comment
commentRouter.post('/add' , isAuthenticated , createComment)


// create comment reply
commentRouter.post('/add/reply/:commentId' , isAuthenticated , createCommentReply)

export default commentRouter