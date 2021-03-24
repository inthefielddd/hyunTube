import routes from "../routes";

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" });
};

export const postJoin = (req, res) => {
    const {
        body: { name, email, password, password2 },
    } = req;
    try {
        if (password !== password2) {
            res.status(400);
        } else {
            //To Do Register User
            //User In
            res.redirect(routes.home);
        }
    } catch {
        console.log(error);
    }
    res.render("join", { pageTitle: "Join" });
};

export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};
export const postLogin = (req, res) => {
    const {
        body: { email, password },
    } = req;
    res.render("login", { pageTitle: "Login" });
    res.redirect(routes.home);
};
export const logout = (req, res) => res.render("logout", { pageTitle: "Logout" });

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });

export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
