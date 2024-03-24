import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import upload from '../middlewares/upload.js';
import { createStory, getAllStory } from "../controllers/storyController.js";



const storyRouter = express.Router();

// create story
storyRouter.post('/create' , isAuthenticated ,upload.single("image")  , createStory)

// get current user all stories
storyRouter.get('/get/all' , isAuthenticated , getAllStory)


export default storyRouter