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
const { connectDB } = require('./config/connectDB')
connectDB()

// Config router
const UserRouter = require('./routes/UserRouter')
const ProductRouter = require('./routes/ProductRouter')
const CartRouter = require('./routes/CartRouter')
const OrderRouter = require('./routes/OrderRouter')
app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/order', OrderRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})