import express from 'express';
import { blockUser, deleteUser, followUser, getBlockLists, getFollowersLists, getFollowingLists, getSingleUser, searchUser, unblockUser, unfollowUser, updateUser, uploadProfileCoverPicture, uploadProfilePicture } from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/isAuthenticate.js';
import upload from '../middlewares/upload.js';

const userRouter = express.Router();

// get single user
userRouter.get('/get/:id' , isAuthenticated , getSingleUser)

//update user
userRouter.put('/update' , isAuthenticated , updateUser)

// which user we want to follow so mentioned in the req.params(userId)
userRouter.post('/follow/:userId' , isAuthenticated , followUser )

// which user we want to un-follow so mentioned in the req.params(userId)
userRouter.post('/unfollow/:userId' , isAuthenticated , unfollowUser )

//get followers user lists
userRouter.get('/get-followers-lists' , isAuthenticated , getFollowersLists)

//get following user lists
userRouter.get('/get-following-lists' , isAuthenticated , getFollowingLists)

// which user we want to block so mentioned in the req.params(userId)
userRouter.post('/block/:userId' , isAuthenticated , blockUser )

// which user we want to un-block so mentioned in the req.params(userId)
userRouter.post('/unblock/:userId' , isAuthenticated , unblockUser )

// GET BLOCK USERS LISTS
userRouter.get('/blocked-lists' , isAuthenticated , getBlockLists )

//delete user
userRouter.delete('/delete' , isAuthenticated , deleteUser)

//serch user
userRouter.get('/search/:query' , isAuthenticated , searchUser)

//update profile picture
userRouter.put('/update-profile-picture' , isAuthenticated , upload.single("profilePicture" ), uploadProfilePicture)

//update cover picture
userRouter.put('/update-cover-picture' , isAuthenticated , upload.single("coverPicture" ), uploadProfileCoverPicture)

export default userRouter
