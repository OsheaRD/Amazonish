const passport = require("passport");

exports.getSignUp = (req, res, next) => {
	res.render("auth/signup", {
		pageTitle: "Sign Up",
		path: "/signup",
	});
};

// exports.postSignUp = (req, res, next) => {
// 	passport.authenticate("local-signup", {
// 		successRedirect: "/signin",

// 		failureRedirect: "/signup",
// 	});
// };

exports.getSignIn = (req, res, next) => {
	res.render("auth/signin", {
		pageTitle: "Sign In",
		path: "/signin",
	});
};

exports.getSignOut = (req, res, next) => {
	req.session.destroy(err => {
		res.redirect("/");
	});
};

exports.isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect("/signin");
};
