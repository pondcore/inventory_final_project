require('dotenv').config()

const express = require('express');
const cors = require('cors');

const connectDB = require("./config/db");

const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');


const app = express();
const port = process.env.PORT || 3000

connectDB();

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({
    limit: '10mb',
    extended: true,
}))
app.use(cors())

app.use('/hello', (req, res) => {
    res.send("<h2>Hello World.</h2>");
})

// const mongoose = require("mongoose");
// app.get('/drop/:name', (req, res) => {

//     mongoose.connection.db.dropCollection(req.params.name, function (err, result) {
//         res.send("<h2>Hello World.</h2>");
//     });
// })

app.use('/api/customer', customerRoutes);
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);
const dashboardController = require('./controller/dashboardControllers');

app.use('/api/summary', dashboardController.summary);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})

app.use((req, res, next) => {
    res.status(404).send("Not Found!")
})

app.use(function (err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message);
})

