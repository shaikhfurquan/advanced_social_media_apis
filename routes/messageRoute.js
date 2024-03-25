import express  from "express";
import { isAuthenticated } from '../middlewares/isAuthenticate.js'

const messageRouter = express.Router();


export default messageRouter