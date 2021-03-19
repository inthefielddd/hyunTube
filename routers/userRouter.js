import express from "express";
import { changePassword, editProfile, userDetail, users } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", users);

userRouter.get("/:id", userDetail);

userRouter.get("/edit-profile", editProfile);

userRouter.get("/change-password", changePassword);

export default userRouter;
