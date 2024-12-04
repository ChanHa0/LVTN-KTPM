const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const compression = require('compression');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

// Config app
app.use(cors());
app.use(express.json())
app.use(compression())
app.use(bodyParser.json())

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connect to MongoDB successfully');
    } catch (error) {
        console.log('Connect to MongoDB failed', error);
    }
};

// Config router
const UserRouter = require('./routes/UserRouter')
const ProductRouter = require('./routes/ProductRouter')
const CartRouter = require('./routes/CartRouter')
const OrderRouter = require('./routes/OrderRouter')
const StatisticRouter = require('./routes/StatisticRouter')
app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/order', OrderRouter)
app.use('/api/statistics', StatisticRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
connectDB()

// const generatePDF = require('./data/generatePDF');
// const User = require('./models/Users');
// const Product = require('./models/Products');
// const Order = require('./models/Orders');
// const Cart = require('./models/Carts');

// const createPDF = async () => {
//     try {
//         const users = await User.find();
//         const products = await Product.find();
//         const orders = await Order.find();
//         const carts = await Cart.find();

//         // Gọi hàm generatePDF với dữ liệu đã lấy
//         await generatePDF(users, products, orders, carts);
//     } catch (error) {
//         console.error('Lỗi khi tạo file PDF:', error);
//     }
// };

// // Giả sử bạn đã kết nối MongoDB ở đây
// createPDF();

