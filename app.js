// express를 호출하고 node_modules에서 import 해서 app변수를 선언해서 express를 실행 
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter  from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
const app = express();

app.set("view engine","pug");
//middleware의 위치가 중요하다 
//route를 처리하기 전에 위치해야함
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet());
app.use(morgan("dev"));


//누군가 /user경로에 접속하면 이 router 전체를 사용하겠다
app.use(routes.home,globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos,videoRouter);

export default app;