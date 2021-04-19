import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
    const {
        body: { name, email, password, password2 },
    } = req;

    if (password !== password2) {
        //비밀번호가 맞지 않을 때
        //다시 join 화면 렌더 할 것이다.
        res.status(400);
        res.render("join", { pageTitle: "Join" });
    } else {
        try {
            //유저 만들어오고
            const user = await User({
                name,
                email,
            });
            //등록(user, password)
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
            res.redirect(routes.home);
        }
    }
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};
export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.home,
});
//githubLogin
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: { id, avatar_url, name, email },
    } = profile;
    try {
        //유저가있다면
        const user = await User.findOne({ email });
        if (user) {
            user.githubId = id;
            user.save();
            //첫번째인자(에러없음), 두번쨰(user)
            //이것을 쿠키에 저장할 수 있게된다.
            return cb(null, user);
        }
        //유저가 없다면
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl: avatar_url,
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};
export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    res.redirect(routes.home);
};

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
