import express from "express";
import { getChangePassword, getEditProfile, postChangePassword, postEditProfile, userDetail } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middleware";
import routes from "../routes";

const userRouter = express.Router();

//editProfile
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
