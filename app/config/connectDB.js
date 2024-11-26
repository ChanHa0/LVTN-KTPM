const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect to MongoDB successfully');
    } catch (error) {
        console.log('Connect to MongoDB failed', error);
    }
}
module.exports = { connectDB }