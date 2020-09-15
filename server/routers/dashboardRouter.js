import express from 'express';
import routes from '../routes';
import { postProfessor, postStudent, getMy } from '../controllers/dashboardController';
import auth from '../middleware/auth';

const dashboardRouter = express.Router();

dashboardRouter.post(routes.professor, postProfessor);
dashboardRouter.post(routes.student, postStudent);
dashboardRouter.get(routes.my, auth, getMy);

export default dashboardRouter;