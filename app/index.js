const { sequelize } = require('./config/database');
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
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

routes(app);

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Kết nối tới SQL Server thành công!');
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    } catch (error) {
        console.error('Không thể kết nối tới database:', error);
    }
}

startServer();