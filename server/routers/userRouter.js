import express from 'express';
import routes from '../routes';
import { postRegister, postLogin, getLogout, postEditProfile } from '../controllers/userController';
const userRouter = express.Router();

userRouter.post(routes.register, postRegister);
userRouter.post(routes.login, postLogin);
userRouter.get(routes.logout, getLogout);
userRouter.post(routes.editProfile, postEditProfile);

export default userRouter;