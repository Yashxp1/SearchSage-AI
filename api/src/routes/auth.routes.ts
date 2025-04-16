import express from 'express';
import { login, logout, signup } from '../controllers/user.conroller';


const authRouter = express.Router();

authRouter.post('/auth/signup', signup);
authRouter.post('/auth/login', login);
authRouter.post('/auth/logout', logout);

export default authRouter