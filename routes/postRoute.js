import express from 'express';
import upload from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { createPost, createPostWithImages, getAllPosts, getUserPosts, updatePost } from '../controllers/postController.js';


const postRouter = express.Router();

//create post 
postRouter.post('/create', isAuthenticated, createPost)


//create post with images
postRouter.post('/create-with-image', isAuthenticated, upload.array("images", 5), createPostWithImages)


// update post 
postRouter.put('/update/:postId', isAuthenticated, updatePost)


// get all posts
postRouter.get('/get-all/:userId' , isAuthenticated , getAllPosts)


// get user posts
postRouter.get('/get-user-posts' , isAuthenticated , getUserPosts)

export default postRouter