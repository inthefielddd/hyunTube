import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import routes from "./routes";

const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//router
app.get(routes.home, globalRouter);
app.get(routes.users, userRouter);
app.get(routes.videos, videoRouter);

export default app;
