import express from 'express';
import { verifyTokenController } from '../controllers/featureController';

const featureRouter = express.Router();

featureRouter.get('/verify', verifyTokenController);

export default featureRouter;
