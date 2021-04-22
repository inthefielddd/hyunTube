import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
    try {
        const videos = await Video.find({}).sort({ _id: -1 });
        res.render("home", { pageTitle: "Home", videos });
    } catch (error) {
        res.render("home", { pageTitle: "Home", videos: [] });
    }
};

export const search = async (req, res) => {
    const {
        query: { term: searchingBy },
    } = req;
    let videos = [];
    try {
        videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
    } catch (error) {
        console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
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
        creator: req.user.id,
    });
    //upload 비디오를 할 때 작성자의 id를 넣어주고
    //user의 videos안에 newVideo를 넣어준다
    req.user.videos.push(newVideo.id);
    req.user.save();
    console.log(newVideo);
    res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id).populate("creator");
        console.log(video.creator.id);
        res.render("videoDetail", { pageTitle: video.title, video });
    } catch (error) {
        res.redirect(routes.home);
    }
};
export const getEditVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        //보안을 위해서 값을 설정해주기ㅏ
        if (video.creator !== req.user.id) {
            //작성자와 user값이 같지 않을떄는
            throw Error();
        } else {
            res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const postEditVideo = async (req, res) => {
    const {
        params: { id },
        body: { title, description },
    } = req;
    try {
        await Video.findOneAndUpdate({ _id: id }, { title, description });
        res.redirect(routes.videoDetail(id));
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const deleteVideo = async (req, res) => {
    const {
        params: { id },
    } = req;
    try {
        const video = await Video.findById(id);
        if (`${video.creator}` !== `${req.user.id}`) {
            throw Error();
        } else {
            await Video.findByIdAndDelete({ _id: id });
        }
    } catch (error) {
        res.redirect(routes.home);
    }
    res.redirect(routes.home);
};
