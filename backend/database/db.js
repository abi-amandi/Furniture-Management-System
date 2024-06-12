const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.URI;

const connectDB = async () => {
    try {
        await mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            if (process.env.NODE_ENV !== 'test') {
                console.log('Database connection success');
            }
    } catch (err) {
        // Throw an error if the connection fails
        throw new Error('Database connection error: ' + err.message);
    }
};

module.exports = connectDB;