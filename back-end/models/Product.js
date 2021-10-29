const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	product_name: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	sku: {
		type: String,
		unique: true,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	qty: {
		type: Number,
		required: true
	},
	weight: {
		type: Number,
		required: true
	},
	cost: {
		type: Number,
		required: true,
	},
	vat: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		trim: true,
		required: true
	},
}, {
	timestamps: true
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
