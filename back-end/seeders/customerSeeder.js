require("dotenv").config();

const Customer = require('../models/Customer');
const customerData = require('../data/customers');

const customerSeeder = async () => {
    try {
        await Customer.deleteMany({});
        for (let i = 1; i < 6; i++) {
            await Customer.create({
                prefix: 'นาย',
                firstname: "customer" + i,
                lastname: "customer" + i,
                phone: "0987654321",
                image: 'https://picsum.photos/id/' + i + '/200/200',
                addr: [{
                    description: '123 หมู่ 4',
                    tambon_name: 'สุเทพ',
                    amphur_name: 'เมือง',
                    province_name: 'เชียงใหม่',
                    post_code: '50200'
                }]
            });
        }

        console.log("Customer data Import Success");

        process.exit();
    } catch (error) {
        console.error("Error Customer data import");
        process.exit(1);
    }
}

module.exports = customerSeeder