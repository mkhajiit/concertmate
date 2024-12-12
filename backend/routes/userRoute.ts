import express from 'express';
import { addUserController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', addUserController);

export default userRouter;
