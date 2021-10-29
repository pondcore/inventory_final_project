
const Order = require('../models/Order');
const dayjs = require('dayjs')

async function orderQueryByTime(filterTime) {
    return await Order.find({
        createdAt: {
            $gte: dayjs().startOf(filterTime),
            $lt: dayjs().endOf(filterTime)
        },
        payment_status: 'paid'
    }, 'total_price total_cost shipping_cost products');
}

function mapProduct(orderArray) {
    let prodList = {};
    orderArray.forEach(order => {
        order.products.forEach(prod => {
            if (prodList.hasOwnProperty(prod.id)) {
                prodList[prod.id] += prod.amount;
            } else {
                prodList[prod.id] = prod.amount;

            }
        })
    })
    return prodList;
}

const summary = async (req, res) => {
    try {
        const today = await orderQueryByTime('day');
        let sumPriceDay = today.reduce((acc, cur) => acc + cur.total_price, 0);
        let sumProfitDay = today.reduce((acc, cur) => acc + cur.total_price - cur.total_cost - cur.shipping_cost, 0);
        let productAmountToday = mapProduct(today);


        const thisWeek = await orderQueryByTime('week');
        let sumPriceWeek = thisWeek.reduce((acc, cur) => acc + cur.total_price, 0);
        let sumProfitWeek = thisWeek.reduce((acc, cur) => acc + cur.total_price - cur.total_cost - cur.shipping_cost, 0);
        let productAmountWeek = mapProduct(thisWeek);

        const thisMonth = await orderQueryByTime('month');
        let sumPriceMonth = thisMonth.reduce((acc, cur) => acc + cur.total_price, 0);
        let sumProfitMonth = thisMonth.reduce((acc, cur) => acc + cur.total_price - cur.total_cost - cur.shipping_cost, 0);
        let productAmountMonth = mapProduct(thisMonth);

        res.status(200).json({
            todaySummary: sumPriceDay,
            todayProfit: sumProfitDay,
            // รายวัน
            productAmountToday,


            weekSummary: sumPriceWeek,
            weekProfit: sumProfitWeek,
            // รายสัปห์ดา
            productAmountWeek,


            monthSummary: sumPriceMonth,
            monthProfit: sumProfitMonth,

            // รายเดือน
            productAmountMonth,
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: error.message })
    }
}

module.exports = {
    summary
}
