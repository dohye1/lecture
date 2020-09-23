import express from 'express';
import routes from '../routes';
import { postEvaluate, postShow } from '../controllers/scoreController';
import auth from '../middleware/auth';

const scoreRouter = express.Router();
scoreRouter.post(routes.evaluate, auth, postEvaluate);
scoreRouter.post(routes.show, auth, postShow);

export default scoreRouter;
