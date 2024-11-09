const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const compression = require('compression');
const errorHandler = require('./middlewares/errorHandler');
const { sequelize } = require('./config/connectDB');
const dotenv = require('dotenv')
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

// Config app
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json())
app.use(bodyParser.json())
app.use(compression())
// Config router
const UserRouter = require('./routes/UserRouter')
const ProductRouter = require('./routes/ProductRouter')
const CartRouter = require('./routes/CartRouter')

app.use('/api/user', UserRouter)
app.use('/api/product', ProductRouter)
app.use('/api/cart', CartRouter)

app.use(errorHandler)


async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối tới SQL Server thành công!');
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    } catch (error) {
        console.error('Không thể kết nối tới database:', error.message);
    }
}

startServer()