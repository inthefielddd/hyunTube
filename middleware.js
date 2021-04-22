import multer from "multer";
import routes from "./routes";

//multer를 이용해서 fileURL값을 가져와서
//video 파일 전체가 아닌 주소만 올린다
const multerVideo = multer({ dest: "uploads/videos" });
const multerAvatar = multer({ dest: "uploads/avatars" });

export const localsMiddleWare = (req, res, next) => {
    res.locals.routes = routes;
    res.locals.siteName = "HyunTube";
    res.locals.loggedUser = req.user || null;
    next();
};

export const onlyPublic = (req, res, next) => {
    if (req.user) {
        //passport가 있기때문에 user값을 가져올 수 가 있다
        //유저가 있다면 home으로 가져가고
        res.redirect(routes.home);
    } else {
        next();
    }
};

export const onlyPrivate = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect(routes.home);
    }
};

export const uploadVideo = multerVideo.single("fileURL");
export const uploadAvatar = multerAvatar.single("avatar");
