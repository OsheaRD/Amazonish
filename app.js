require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();

// Passport configuration
const passport = require("passport");
const LocalStrategy = require("passport-local");
const GitHubStrategy = require("passport-github").Strategy;
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// Passport configuration - Local Strategy
app.use(
	session({
		// store: new FileStore(),
		secret: "secret",
		resave: false,
		saveUninitialized: true,
	})
);

const user = {
	id: "1",
	email: "merchant@amazonish.com",
	password: "password",
};

passport.use(
	new LocalStrategy(
		{
			usernameField: "email",
		},
		(email, password, done) => {
			if (email === user.email && password === user.password) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		}
	)
);

// Passport configuration - Github Strategy
passport.use(
	new GitHubStrategy(
		{
			clientID: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
			callbackURL: process.env.GITHUB_CALLBACK_URL,
		},
		function (accessToken, refreshToken, profile, cb) {
			return cb(null, profile);
		}
	)
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	const _user = user.id === id ? user : false;
	done(null, _user);
});

// Importing routes
const mechantRoutes = require("./routes/merchant");
// const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json()); // request body has been parsed
app.use(express.urlencoded({extended: false})); // request body has been url encoded
app.use(express.static("./public")); // linked to css and js files

app.use(mechantRoutes);
// app.use(shopRoutes);
app.use(authRoutes);

app.get("*", (req, res, next) => {
	res.status(404).render("404");
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
