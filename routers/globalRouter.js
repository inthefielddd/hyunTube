import express from "express";
import passport from "passport";
import { getJoin, getLogin, githubLogin, logout, postGithubLogin, postJoin, postLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPrivate, onlyPublic } from "../middleware";
import routes from "../routes";

const globalRouter = express.Router();

//join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

//login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

//github
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(routes.gitHubCallback, passport.authenticate("github", { failureRedirect: "/login" }), postGithubLogin);

export default globalRouter;
