import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import upload from '../middlewares/upload.js';
import { createStory } from "../controllers/storyController.js";



const storyRouter = express.Router();

// create story
storyRouter.post('/create' , isAuthenticated ,upload.single("image")  , createStory)

export default storyRouter