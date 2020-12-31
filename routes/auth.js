const express = require("express");
const passport = require("passport");
const authController = require("../controllers/auth");
const db = require("../models");
const router = express.Router();

// Local Sign Up
router.get("/signup", authController.getSignUp);

router.post(
	"/signup",
	passport.authenticate("local-signup", {
		successRedirect: "/signin",

		failureRedirect: "/signup",
	})
);

// Local Sign In
router.get("/signin", authController.getSignIn);

router.post(
	"/signin",
	passport.authenticate("local-signin", {
		successRedirect: "/products",

		failureRedirect: "/signin",
	})
	// passport.authenticate("local-signin"),
	// function(req, res) {
	// res.send();
);

// Github Sign In
router.get("/auth/github", passport.authenticate("github"));

router.get("/auth/github/callback", passport.authenticate("github", {failureRedirect: "/login"}), function (req, res) {
	// Successful authentication, redirect home.
	res.redirect("/");
});

router.get("/signout", authController.getSignOut);

module.exports = router;
