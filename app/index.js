const { sequelize } = require('./config/connectDB');
const routes = require('./routes');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'X-Requested-With', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());

routes(app);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        status: 'ERR',
        message: err.message || 'Lỗi server',
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

app.use((req, res, next) => {
    res.status(404).json({
        status: 'ERR',
        message: 'Không tìm thấy đường dẫn yêu cầu'
    });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối tới SQL Server thành công!');
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
            console.log('Kết nối thành công!');
        });
    } catch (error) {
        console.error('Không thể kết nối tới database:', error.message);
    }
}

startServer().then(() => {
    console.log('Server khởi động thành công');
}).catch(error => {
    console.error('Lỗi khởi động server:', error);
    process.exit(1);
});