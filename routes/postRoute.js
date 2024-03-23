import express from 'express';
import upload from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import { UnlikePost, createPost, createPostWithImages, deletePost, getAllPosts, getUserPosts, likePost, updatePost } from '../controllers/postController.js';


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

// delete post
postRouter.delete('/delete/:postId' , isAuthenticated , deletePost)

// like post
postRouter.post('/like/:postId' , isAuthenticated , likePost)

// Unlike post
postRouter.post('/un-like/:postId' , isAuthenticated , UnlikePost)


export default postRouter