const Order = require('../models/Order');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

const index = async (req, res) => {
	try {
		const search = req.query.q;
		const fields = req.query.field || {};
		const limit = parseInt(req.query.pageSize || 10);
		const page = parseInt(req.query.current || 1);
		const searchField = req.query.qField;
		let filterOrder = null;
		if (search != null && searchField == 'customer') {
			let filterQuery = null;
			if (search.indexOf(' ') >= 0) {
				let [fname, lname] = search.split(' ')
				filterQuery = {
					$and: [
						{ "firstname": { $regex: `.*${fname}.*` } },
						{ "lastname": { $regex: `.*${lname}.*` } },
					]
				};
			} else {
				filterQuery = {
					$or: [
						{ "firstname": { $regex: `.*${search}.*` } },
						{ "lastname": { $regex: `.*${search}.*` } }
					],
				};
			}
			const customers = await Customer.find(filterQuery).select('_id');
			filterOrder = { 'customer_id': { $in: customers.map(item => item._id) } }
		} else if (search != null && searchField == 'product_name') {
			let filterQuery = null;
			filterQuery = { "product_name": { $regex: `.*${search}.*` } };
			const products = await Product.find(filterQuery).select('_id');
			filterOrder = { 'products.id': { $in: products.map(item => item._id) } }
		} else if (search != null && searchField == 'product_sku') {
			let filterQuery = null;
			filterQuery = { "sku": { $regex: `.*${search}.*` } };
			const products = await Product.find(filterQuery).select('_id');
			filterOrder = { 'products.id': { $in: products.map(item => item._id) } }
		}

		const data = await Order.find(filterOrder)
			.populate({
				path: 'customer_id',
				select: 'prefix firstname lastname phone -_id',
			})
			.populate('products.id', '-image')
			.select(fields)
			.limit(limit)
			.skip(limit * (page - 1))
			.sort({ 'createdAt': -1 });


		const totalOrder = await Order.countDocuments(filterOrder);

		res.status(200).json({
			success: true,
			orders: data,
			pagination: {
				current: page,
				pageSize: limit
			},
			total: totalOrder
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message })
	}
}

const show = async (req, res) => {
	try {
		const data = await Order.findById(req.params.id)
			.populate('customer_id',)
			.populate('products.id');

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message })
	}
}

const store = async (req, res) => {
	try {
		const formRecord = req.body;
		const record = {
			customer_id: formRecord.customerId,
			customer_addr_id: formRecord.addrId,
			sender_id: '1',
			products: formRecord.products,
			total_cost: formRecord.totalCost,
			total_weight: formRecord.totalWeight,
			shipping_cost: formRecord.shippingCost,
			total_price: formRecord.totalPrice,
			payment_status: formRecord.isPaid === '1' ? 'paid' : 'pending',
		}
		const data = await Order.create(record);

		res.status(200).json({
			success: true,
			message: "Order create successfully."
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message })
	}
}

const update = async (req, res) => {
	try {
		const formRecord = req.body;
		const record = {
			customer_id: formRecord.customerId,
			customer_addr_id: formRecord.addrId,
			sender_id: '1',
			products: formRecord.products,
			total_cost: formRecord.totalCost,
			total_weight: formRecord.totalWeight,
			shipping_cost: formRecord.shippingCost,
			total_price: formRecord.totalPrice,
			payment_status: formRecord.isPaid === '1' ? 'paid' : 'pending',
		}
		Order.findByIdAndUpdate(req.params.id, record).then(() => {
			res.status(200).json({ success: true, message: `${req.params.id} was update successfully.` });
		});

	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message })
	}
}

const destroy = async (req, res) => {
	try {
		Order.findByIdAndRemove(req.params.id).then(() => {
			res.status(200).json({ success: true, message: `${req.params.id} was delete successfully.` });
		});

	} catch (error) {
		console.error(error.message);
		res.status(500).json({ success: false, message: error.message })
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy,
}