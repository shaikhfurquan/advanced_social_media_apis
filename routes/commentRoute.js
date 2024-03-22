
import express from 'express'
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createComment } from '../controllers/commentController.js'

const commentRouter = express.Router()

//create comment
commentRouter.post('/add' , isAuthenticated , createComment)


export default commentRouter