import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({});
        console.log(videos);
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        console.log(error);
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};
export const search = (req, res) => {
    const {
        query: { term: SearchingBy },
    } = req;
    res.render("search", { pageTitle: "Search", SearchingBy, videos });
};

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload" });
};

export const postUpload = async (req, res) => {
    const {
        file: { path },
        body: { title, description },
    } = req;
    //To Do:Upload and save video
    const newVideo = await Video.create({
        fileURL: path,
        title,
        description,
    });
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail" });

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video" });
