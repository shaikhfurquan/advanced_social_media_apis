import express from 'express';
import upload from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { createPost } from '../controllers/postController.js';


const postRouter = express.Router();

postRouter.post('/create' , isAuthenticated , createPost)

export default postRouter