
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createComment, createCommentReply, deleteComment, deleteReplyComment, getAllCommentOnPost, updateComment, updateReplyComment } from '../controllers/commentController.js'

const commentRouter = express.Router()

// create comment
commentRouter.post('/add' , isAuthenticated , createComment)

// create comment reply
commentRouter.post('/add/reply/:commentId' , isAuthenticated , createCommentReply)

// update comment
commentRouter.put('/update/:commentId' , isAuthenticated , updateComment)

// update reply comment
commentRouter.put('/update/:commentId/replies/:replyId' , isAuthenticated , updateReplyComment)

// get all comment on post
commentRouter.get('/post/:postId' , isAuthenticated , getAllCommentOnPost)

// delete comment on post
commentRouter.delete('/delete/:commentId' , isAuthenticated , deleteComment)

// delete reply comment on post
commentRouter.delete('/delete/:commentId/reply/:replyId' , isAuthenticated , deleteReplyComment)

export default commentRouter