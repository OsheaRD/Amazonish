require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");

const errorController = require("./controllers/error");

const app = express();
const passport = require("passport");
const session = require("express-session");

// Importing routes
const mechantRoutes = require("./routes/merchant");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

// View engine setup
app.set("view engine", "ejs");
app.set("views", "./views");

// Express BodyParser
app.use(express.json()); // request body has been parsed
app.use(express.urlencoded({extended: false})); // request body has been url encoded
app.use(express.static("./public")); // linked to css and js files

// For Passport
app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// app.use((req, res, next) => {
// 	db.user
// 		.findOne({where: {username: "admin"}})
// 		.then(user => {
// 			req.user = user; // This is sequelize object, not JavasScript object
// 			user.createCart();
// 			next();
// 		})
// 		.catch(err => console.log(err));
// });

const db = require("./models");

require("./config/passport.js")(passport, db.user);

db.sequelize
	.sync()
	.then(result => {
		console.log("Database looks fine");
	})
	// .then(result => {
	// // 	return db.user.findOne({
	// // 		// findOrCreate
	// // 		where: {username: "admin"},
	// // 	});
	// // })
	// // .then(user => {
	// // 	if (!user) {
	// // 		return db.user.create({username: "admin", password: "admin"});
	// // 	}
	// // 	return user;
	// // })
	// // .then(user => {
	// // 	return user.createCart();
	// // })
	.catch(err => {
		console.log(err);
	});

app.use(shopRoutes);
app.use("/merchant", mechantRoutes);
app.use(authRoutes);

app.use("*", errorController.get404);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
