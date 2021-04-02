import express from "express";
import { deleteVideo, getEditVideo, getUpload, postEditVideo, postUpload, videoDetail, videos } from "../controllers/videoController";
import { uploadVideo } from "../middleware";
import routes from "../routes";

const videoRouter = express.Router();

//upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

//edit video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

//video detail
videoRouter.get(routes.videoDetail(), videoDetail);

//delete video
videoRouter.get(routes.deleteVideo(), deleteVideo);

export default videoRouter;
