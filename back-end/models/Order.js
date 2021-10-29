const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	customer_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'customer',
		required: true
	},
	customer_addr_id: {
		type: String,
		required: true
	},
	sender_id: {
		type: String,
		required: false
	},
	products: [
		new mongoose.Schema({
			id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'product',
				required: true
			},
			amount: {
				type: Number,
				required: true
			}
		})
	],
	total_cost: {
		type: Number,
		required: true
	},
	total_weight: {
		type: Number,
		required: true,
	},
	shipping_cost: {
		type: Number,
		required: true,
	},
	total_price: {
		type: Number,
		required: true,
	},
	payment_status: {
		type: String,
		enum: ['pending', 'paid', 'canceled'],
		default: 'pending',
	},
},
	{
		timestamps: true
	});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
