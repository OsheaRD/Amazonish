const express = require("express");
const passport = require("passport");
const shopController = require("../controllers/shop");
const router = express.Router();

router.get("/", shopController.getIndex);

router.get("/login", (req, res, next) => {
	res.render("shop/index");
});

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

router.get("/products", shopController.getProducts); // After log in

// router.get("/products/:productId", shopController.getProduct);

// router.get("/cart", shopController.getCart);

// router.post("/cart", shopController.postCart);

// router.post("/cart-delete-item", shopController.postCartDeleteProduct);

// router.post("/create-order", shopController.postOrder);

// router.get("/orders", shopController.getOrders);

module.exports = router;

// put the log in in this page
