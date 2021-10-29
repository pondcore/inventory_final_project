const Product = require('../models/Product');

const index = async (req, res) => {
	try {
		const search = req.query.q;
		const fields = req.query.field || {};
		const limit = parseInt(req.query.pageSize || 10);
		const page = parseInt(req.query.current || 1);
		let query = null;
		if (search != null) {
			query = { "product_name": { $regex: `.*${search}.*` } };
		}

		const data = await Product.find(query)
			.select(fields)
			.limit(limit)
			.skip(limit * (page - 1))
			.sort({ 'createdAt': -1 });

		const totalProduct = await Product.countDocuments(query)

		res.status(200).json({
			success: true,
			products: data,
			pagination: {
				current: page,
				pageSize: limit
			},
			total: totalProduct
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const show = async (req, res) => {
	try {
		const data = await Product.findById(req.params.id);

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const store = async (req, res) => {
	try {
		const formRecord = req.body;

		const data = await Product.create(formRecord);

		res.status(200).json({
			success: true,
			message: "Order create successfully."
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const update = (req, res) => {
	try {
		const formRecord = req.body;
		Product.findByIdAndUpdate(req.params.id, formRecord).then(() => {
			res.status(200).json({ success: true, message: `${req.params.id} was update successfully.` });
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const destroy = (req, res) => {
	try {
		Product.findByIdAndRemove(req.params.id).then(() => {
			res.status(200).json({ success: true, message: `${req.params.id} was delete successfully.` });
		});

	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy
}
