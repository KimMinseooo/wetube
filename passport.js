import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import { facebookLoginCallback, githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

//pssport 에게 strateg를 쓰라고 말함
passport.use(User.createStrategy());

passport.use(
    new GithubStrategy({
    clientID: process.env.GH_ID ,
    clientSecret: process.env.GH_SECRET ,
    callbackURL : `http://localhost:4000${routes.gitHubCallback}`  
       },
       githubLoginCallback
        )
    );

passport.use(new FacebookStrategy({
    clientID: process.env.FB_ID,
    clientSecret : process.env.FB_SECRET,
    callbackURL : `https://gentle-dragon-10.loca.lt${routes.facebookCallback}`
        },
        facebookLoginCallback
        )
    );

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());