import express from 'express';
import routes from '../routes';
import { getAll, getDepartment, getDetail, postNew, postEnroll } from '../controllers/classController';
const classRouter = express.Router();

classRouter.get(routes.all, getAll);
classRouter.get(routes.department, getDepartment);
classRouter.get(routes.detail, getDetail);

// 새로운 수업을 개설함
classRouter.post(routes.new, postNew);

classRouter.post(routes.enroll, postEnroll);

export default classRouter;