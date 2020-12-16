const db = require("../models");
const Product = db.product;
const Op = db.Sequelize.Op;

exports.getProducts = (req, res, next) => {
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

exports.getAddProduct = (req, res, next) => {
	res.render("merchant/edit-product");
};

exports.postAddProduct = (req, res, next) => {
	if (!req.body.title) {
		res.satus(400).send({
			message: "Content can not be empty!",
		});
		return;
	}

	const product = {
		title: req.body.title,
		imageUrl: req.body.imageUrl,
		price: req.body.price,
		description: req.body.description,
		review: req.body.review,
	};

	Product.create(product)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Tutorial.",
			});
		});
};

exports.getEditProduct = (req, res, next) => {
	const id = req.params.id;
	res.render("merchant/edit-product");
};

exports.pathEditProduct = (req, res, next) => {
	const id = req.params.id;
	Product.update(req.body, {where: {id: id}})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Product was udpated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`,
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Product with id=" + id,
			});
		});
};

exports.deleteEditProduct = (req, res, next) => {
	const id = req.params.id;

	Product.destroy({
		where: {id: id},
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Product was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Product with id=" + id,
			});
		});
};
