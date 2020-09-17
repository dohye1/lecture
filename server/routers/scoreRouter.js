import express from 'express';
import routes from '../routes';
import { postProfessor } from '../controllers/scoreController';
import auth from '../middleware/auth';

const scoreRouter = express.Router();


export default scoreRouter;