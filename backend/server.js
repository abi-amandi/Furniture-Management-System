const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const filterRoutes = require('./routes/filter');
const userRoutes = require('./routes/user.route');
const orderRoutes = require('./routes/order.route');
const cartRoutes = require('./routes/cart.route');
const riderRoutes = require('./routes/rider.route');
const deliveryVehicleRoutes = require('./routes/vehicle.route');
const orderRiderRoutes = require('./routes/orderRider.route');
const quatationRoutes = require('./routes/supply/quatationroutes');
const supplierRoutes = require('./routes/supply/supplierroutes');
const warehouseRoutes = require('./routes/warehouse/warehouseRoute');
const adminRoutes = require('./routes/employee/adminRoutes');
const managerRoutes = require('./routes/employee/managerRoutes');
const usersRoutes = require('./routes/employee/userRouters');

const serviceRoutes = require('./routes/feedback/ServiceRoute');
const webpageRoutes = require('./routes/feedback/WebPageRoute');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(session({
    secret: "qwrewadsc2wjdnaskf9ajsn1",
    resave: false,
    saveUninitialized: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.status(200).send('Hello from server!');
});
app.use('/api/category', categoryRoutes);
app.use('/api/product', productRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/filter', filterRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/deliveryvehicles', deliveryVehicleRoutes);
app.use('/api/riders', riderRoutes);
app.use('/api/user', userRoutes);

app.use('/api/order/rider', orderRiderRoutes);
app.use('/api/quatation', quatationRoutes);
app.use('/Images', express.static('Images'));
app.use('/api/supplier', supplierRoutes);
app.use('/api/warehouse', warehouseRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/manager', managerRoutes);
app.use('/api/v1/user', usersRoutes);
app.use('/service', serviceRoutes);
app.use('/webpage', webpageRoutes);

// Database connection
connectDB(); // This connects to your database using the environment variables

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => console.log(`Listening on port ${port}`));
}

module.exports = app;
