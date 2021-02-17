import passport from "passport";
import User from "./models/User";

//pssport 에게 strateg를 쓰라고 말함
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());