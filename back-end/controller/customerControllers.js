const Customer = require('../models/Customer');

const index = async (req, res) => {
	try {
		const search = req.query.q;
		const fields = req.query.field || {};
		const limit = parseInt(req.query.limit || 10);
		const page = parseInt(req.query.page || 1) - 1;
		let query = null;
		if (search != null) {
			if (search.indexOf(' ') >= 0) {
				let [fname, lname] = search.split(' ')
				query = {
					$and: [
						{ "firstname": { $regex: `.*${fname}.*` } },
						{ "lastname": { $regex: `.*${lname}.*` } },
					]
				};
			} else {
				query = {
					$or: [
						{ "firstname": { $regex: `.*${search}.*` } },
						{ "lastname": { $regex: `.*${search}.*` } }
					],
				};
			}
		}

		const data = await Customer.find(query)
			.select(fields)
			.limit(limit)
			.skip(limit * page)
			.sort({ 'createdAt': -1 });

		const totalCustomer = await Customer.countDocuments(query);

		res.status(200).json({
			success: true,
			customers: data,
			total: totalCustomer
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const show = async (req, res) => {
	try {
		const data = await Customer.findById(req.params.id);

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const store = async (req, res) => {
	try {
		const formRecord = req.body;
		const record = {
			prefix: formRecord.prefix,
			firstname: formRecord.firstname,
			lastname: formRecord.lastname,
			phone: formRecord.phone,
			image: formRecord.image,
			addr: [{
				description: formRecord.address,
				tambon_name: formRecord.subdistrict,
				amphur_name: formRecord.district,
				province_name: formRecord.province,
				post_code: formRecord.postcode
			}]
		}
		const data = await Customer.create(record);
		// console.log(req.body);

		res.status(200).json(data);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const update = async (req, res) => {
	try {
		const formRecord = req.body;
		let customerDocument = await Customer.findOne({ "addr._id": req.params.id });

		customerDocument.prefix = formRecord.prefix;
		customerDocument.firstname = formRecord.firstname;
		customerDocument.lastname = formRecord.lastname;
		customerDocument.phone = formRecord.phone;
		customerDocument.image = formRecord.image;

		customerDocument.addr.some((item, index) => {
			if (item._id == formRecord.addrId) {
				customerDocument.addr[index].description = formRecord.address
				customerDocument.addr[index].tambon_name = formRecord.subdistrict
				customerDocument.addr[index].amphur_name = formRecord.district
				customerDocument.addr[index].province_name = formRecord.province
				customerDocument.addr[index].post_code = formRecord.postcode
				return true;
			} else {
				return false;
			}
		})
		await customerDocument.save();

		res.status(200).json({ success: true, message: `${req.params.id} was update successfully.` });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message })
	}
}

const destroy = async (req, res) => {
	try {
		const data = await Customer.findOne({ "addr._id": req.params.id });
		if (data.addr.length < 2) {
			await data.remove();
		} else {
			data.addr.id(req.params.id).remove();
			await data.save();
		}

		res.status(200).json({ success: true, message: `${req.params.id} was delete successfully.` });
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
