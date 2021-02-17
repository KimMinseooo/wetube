import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    name : String,
    email : String,
    avatarUrl : String,
    facebookId : Number,
    githubId : Number 
});

//Schema 추가 사용자인증을 사용하기 위함
UserSchema.plugin(passportLocalMongoose, {usernameField: "email"});

const model = mongoose.model("User", UserSchema);

export default model;