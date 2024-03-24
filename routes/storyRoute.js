import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import upload from '../middlewares/upload.js';
import { createStory, deleteAllStories, deleteStory, getAllStory, getUserStory } from "../controllers/storyController.js";



const storyRouter = express.Router();

// create story
storyRouter.post('/create' , isAuthenticated ,upload.single("image")  , createStory)

// get current user all stories
storyRouter.get('/get/all' , isAuthenticated , getAllStory)

// get other user story
storyRouter.get('/get/user-story/:userId' , isAuthenticated , getUserStory)

//delete current user story
// storyRouter.delete('/delete/:storyId' , isAuthenticated , deleteStory)

//delete all current user story
storyRouter.delete('/delete/all-stories' , isAuthenticated , deleteAllStories)
export default storyRouter