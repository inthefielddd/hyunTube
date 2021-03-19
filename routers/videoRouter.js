import express from "express";
import { deleteVideo, editVideo, upload, videoDetail, videos } from "../controllers/videoController";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get("/", videos);

videoRouter.get("/upload", upload);

videoRouter.get("/:id", videoDetail);

videoRouter.get("/:id/edit", editVideo);

videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;
