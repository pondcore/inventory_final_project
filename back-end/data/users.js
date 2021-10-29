const bcrypt = require('bcrypt');

const hashedPassword = async () => await bcrypt.hash("1234567890", 12)

const users = [
	{
		username: "shop1",
		password: hashedPassword,
		firstname: "shop1",
		lastname: "shop1",
		phone: "0987654321"
	},
	{
		username: "shop2",
		password: hashedPassword,
		firstname: "shop2",
		lastname: "shop2",
		phone: "0987654321"
	},
	{
		username: "shop3",
		password: hashedPassword,
		firstname: "shop3",
		lastname: "shop3",
		phone: "0987654321"
	},
	{
		username: "shop4",
		password: hashedPassword,
		firstname: "shop4",
		lastname: "shop4",
		phone: "0987654321"
	},
];

module.exports = users;
