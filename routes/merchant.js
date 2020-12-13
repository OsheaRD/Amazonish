const express = require("express");
const passport = require("passport");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("shop/index");
});

// router.get("/login", (req, res, next) => {});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user) => {
		if (err) {
			return next(err);
		}
		if (!user) {
			return res.send("Wrong email or password");
		}
		req.login(user, () => {
			res.send("You are authenticated");
		});
	})(req, res, next);
});

router.get("/secret", (req, res, next) => {
	if (req.isAuthenticated()) {
		res.send("You are authorized to see this private page");
	} else {
		res.status(403).send("Access denied");
	}
});

router.get("/logout", (req, res, next) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
