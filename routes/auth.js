const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth");
const db = require("../models");
const router = express.Router();
let currentUser;

router.get("/signup", authController.getSignUp);

router.post(
	"/signup",
	passport.authenticate("local-signup", {
		successRedirect: "/",

		failureRedirect: "/signup",
	})
);

router.get("/signin", authController.getSignIn);

router.post(
	"/signin",
	passport.authenticate("local-signin"),
	(req, res, next) => {
		db.user
			.findOne({where: {username: req.user.username}})
			.then(user => {
				currentUser = user; // This is sequelize object, not JavasScript object
				// user.createCart();
				res.redirect("/products");
			})
			.catch(err => console.log(err));
	}
	// passport.authenticate("local-signin", {
	// 	successRedirect: "/products",

	// 	failureRedirect: "/signin",
	// })
);

router.get("/signout", authController.getSignOut);

module.exports = router;
