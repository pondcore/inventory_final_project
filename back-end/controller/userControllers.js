const User = require('../models/User');

const index = async (req, res) => {
	try {
		const data = await User.find();

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" })
	}
}

const show = async (req, res) => {
	try {
		const data = await User.findById(req.params.id);

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" })
	}
}

const store = async (req, res) => {
	try {
		const record = req.body;
		const data = await User.create(record);

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" })
	}
}

const update = async (req, res) => {
	try {
		const record = req.body;
		const data = await User.findByIdAndUpdate(req.params.id, { $set: record });

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" })
	}
}

const destroy = async (req, res) => {
	try {
		const data = await User.findByIdAndDeleted(req.params.id);

		res.status(200).json({ message: `${req.params.id} was delete successfully.` });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server Error" })
	}
}

module.exports = {
	index,
	show,
	store,
	update,
	destroy
}
