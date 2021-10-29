require("dotenv").config();

const User = require('../models/User');
const userData = require('../data/users');

const userSeeder = async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(userData);

        console.log("User data Import Success");

        process.exit();
    } catch (error) {
        console.error("Error User data import");
        process.exit(1);
    }
}

module.exports = userSeeder