const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.getIndex = (req, res, next) => {
	const title = req.query.title;
	let condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null;

	Product.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving products",
			});
		});
};

exports.getProducts = (req, res, next) => {
	// After log in
	const title = req.query.title;
	let condition = title ? {title: {[Op.iLike]: `%${title}%`}} : null;

	Product.findAll({where: condition})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving products",
			});
		});
};
