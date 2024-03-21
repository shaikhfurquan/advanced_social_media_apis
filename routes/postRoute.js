import express from 'express';
import upload from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { createPost, createPostWithImages } from '../controllers/postController.js';


const postRouter = express.Router();

//create post 
postRouter.post('/create', isAuthenticated, createPost)


//create post with images
postRouter.post('/create-with-image', isAuthenticated, upload.array("images", 5), createPostWithImages)

export default postRouter