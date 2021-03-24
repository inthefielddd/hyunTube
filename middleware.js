import routes from "./routes";

export const localsMiddleWare = (req, res, next) => {
    res.locals.routes = routes;
    res.locals.siteName = "HyunTube";
    res.locals.user = {
        isAuthenicated: true,
        id: 123,
    };
    next();
};
