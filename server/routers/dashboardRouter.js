import express from 'express';
import routes from '../routes';
import { postProfessor, postStudent } from '../controllers/dashboardController';

const dashboardRouter = express.Router();

dashboardRouter.post(routes.professor, postProfessor);
dashboardRouter.post(routes.student, postStudent);

export default dashboardRouter;