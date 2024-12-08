const Product = require("../models/Product");
const createError = require("http-errors");

// CREATE
async function createProduct(req, res, next) {
	try {
		const product = new Product(req.body);
		const saved = await product.save();
		res.status(201).json(saved);
	} catch (error) {
		next(error); // Pass to error handler
	}
}

// READ ALL
async function getAllProducts(req, res, next) {
	try {
		const products = await Product.find({});
		res.status(200).json(products);
	} catch (error) {
		next(error);
	}
}

// READ ONE
async function getProductById(req, res, next) {
	try {
		const { id } = req.params;
		const product = await Product.findById(id);
		if (!product) throw createError(404, "Product not found");
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
}

// UPDATE
async function updateProduct(req, res, next) {
	try {
		const { id } = req.params;
		const updates = { ...req.body, updatedAt: new Date() };
		const product = await Product.findByIdAndUpdate(id, updates, { new: true });
		if (!product) throw createError(404, "Product not found");
		res.status(200).json(product);
	} catch (error) {
		next(error);
	}
}

// DELETE
async function deleteProduct(req, res, next) {
	try {
		const { id } = req.params;
		const result = await Product.findByIdAndDelete(id);
		if (!result) throw createError(404, "Product not found");
		res.status(204).send();
	} catch (error) {
		next(error);
	}
}

module.exports = {
	createProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	deleteProduct,
};
