import { createPrompt } from "../controllers/prompt.controller";
import express from 'express'
import protectRoute from "../middleware/auth.middleware";

const promptRouter = express.Router()

promptRouter.post('/summary', protectRoute, createPrompt)

export default promptRouter