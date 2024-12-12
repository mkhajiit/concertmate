import express from 'express';
import { addUserController, loginUserController } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', addUserController);
userRouter.post('/login', loginUserController);

export default userRouter;
