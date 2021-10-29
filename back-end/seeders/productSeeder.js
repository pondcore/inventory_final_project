require("dotenv").config();

const Product = require('../models/Product');
const productData = require('../data/products');

const productSeeder = async () => {
    try {
        await Product.deleteMany({});
        for (let i = 1; i < 20; i++) {
            await Product.create({
                product_name: `product${i}`,
                image: `https://picsum.photos/id/10${i}/200/200`,
                sku: `04102021` + String(i).padStart(4, '0'),
                price: 100,
                qty: 10,
                weight: 1,
                cost: 10,
                vat: 0.3
            });

        }

        console.log("Product data Import Success");

        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = productSeeder