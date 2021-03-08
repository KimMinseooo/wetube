import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import { getJoin, postJoin,getLogin,postLogin, logout, githubLogin, postGithubLogIn, getMe, facebookLogin, postFacebookLogin ,kakaoLogin, postKakaoLonIn} from "../controllers/userController";
import { onlyPrivate, onlyPublic } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout,onlyPrivate, logout);

globalRouter.get(routes.gitHub, githubLogin );

globalRouter.get(
    routes.gitHubCallback,
    passport.authenticate("github",{failureRedirect:"/login"}),
    postGithubLogIn
    );

globalRouter.get(routes.kakao, kakaoLogin);

globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", {failureRedirect:"/login"}),
  postKakaoLonIn
  );

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate("facebook", {failureRedirect: "/login"}),
    postFacebookLogin
  );

export default globalRouter;