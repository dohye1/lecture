import express from 'express';
import routes from '../routes';
import {
  postRegister,
  postLogin,
  getLogout,
  postEditProfile,
  getAuth,
  getupdate
} from '../controllers/userController';
import auth from '../middleware/auth';

const userRouter = express.Router();

userRouter.post(routes.register, postRegister);
userRouter.post(routes.login, postLogin);
userRouter.get(routes.logout, auth, getLogout);
userRouter.post(routes.editProfile, postEditProfile);
userRouter.get(routes.auth, auth, getAuth);
userRouter.get(routes.update, auth, getupdate);

export default userRouter;
