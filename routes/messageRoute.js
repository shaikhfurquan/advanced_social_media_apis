import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'
import { createMessage, getMessage } from "../controllers/messageController.js";

const messageRouter = express.Router();

//create message route
messageRouter.post('/create' , isAuthenticated , createMessage)

//get message route
messageRouter.get('/get/:conversationId' , isAuthenticated , getMessage)

export default messageRouter