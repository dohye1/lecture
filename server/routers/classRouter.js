import express from 'express';
import routes from '../routes';
import { getAll, postNew, postEnroll,postEdit } from '../controllers/classController';
import auth from '../middleware/auth';

const classRouter = express.Router();

classRouter.get(routes.all, getAll);

// 새로운 수업을 개설함
classRouter.post(routes.new, auth, postNew);
classRouter.post(routes.editClass, postEdit);
classRouter.post(routes.enroll, auth, postEnroll);

export default classRouter;
