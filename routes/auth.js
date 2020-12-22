const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/signup", authController.getSignUp);

router.post(
	"/signup",
	passport.authenticate("local-signup", {
		successRedirect: "/products",

		failureRedirect: "/signup",
	})
);

router.get("/signin", authController.getSignIn);

router.post(
	"/signin",
	passport.authenticate("local-signin", {
		successRedirect: "/products",

		failureRedirect: "/signin",
	})
);

router.get("/signout", authController.getSignOut);

module.exports = router;
