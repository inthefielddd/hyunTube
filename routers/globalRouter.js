import express from "express";
import { getJoin, getLogin, join, login, logout, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import routes from "../routes";

const globalRouter = express.Router();

globalRouter.get(routes.home, home);

//join
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin);

//login
globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;
