import multer from "multer";
import routes from "./routes";

//multer를 이용해서 fileURL값을 가져와서
//video 파일 전체가 아닌 주소만 올린다
const multerVideo = multer({ dest: "uploads/videos" });

export const localsMiddleWare = (req, res, next) => {
    res.locals.routes = routes;
    res.locals.siteName = "HyunTube";
    res.locals.user = {
        isAuthenicated: false,
        id: 123,
    };
    next();
};

export const uploadVideo = multerVideo.single("fileURL");
