const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	category: { type: String, required: true },
	inStock: { type: Boolean, required: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

// Add a transform to remove __v on JSON
productSchema.set("toJSON", {
	transform: (doc, ret) => {
		delete ret.__v;
		return ret;
	},
});

module.exports = mongoose.model("Product", productSchema);
