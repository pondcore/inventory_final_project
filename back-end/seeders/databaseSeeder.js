const connectDB = require('../config/db');

const userSeeder = require('./userSeeder');
const customerSeeder = require('./customerSeeder');
const productSeeder = require('./productSeeder');

connectDB();
// customerSeeder();
// userSeeder();
productSeeder();

