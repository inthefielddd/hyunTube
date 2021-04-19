import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";
import { localsMiddleWare } from "./middleware";

import "./passport";

const app = express();

app.use(helmet());
//view를 pug으로 설정한다는 뜻
app.set("view engine", "pug");
//upload한 파일들을 폴더로 보내기 위해
app.use("/uploads", express.static("uploads"));
//css 파일을 연결하기위해
app.use("/static", express.static("static"));
app.use(morgan("dev"));
//session을 이용해서 쿠키를 저장하고 해독해준다
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URL }),
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(localsMiddleWare);
//router
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
