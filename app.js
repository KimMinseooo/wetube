// express를 호출하고 node_modules에서 import 해서 app변수를 선언해서 express를 실행 
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";
const app = express();

const handleHome = (req, res) => res.send("Hello from ass ");

const handleProfile = (req, res) => res.send("You are on my profile");

const betweenHome = (req, res, next) => {
    console.log("Between");
    next();
    // next()가 꼭 필요 ! 하지않으면 다음에 실행할 콜백 함수가 실행하지않음.
}; 

//middleware의 위치가 중요하다 
//route를 처리하기 전에 위치해야함
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

//누군가 /user경로에 접속하면 이 router 전체를 사용하겠다
app.use("/user", userRouter);

export default app;