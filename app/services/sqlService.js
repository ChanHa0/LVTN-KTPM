const sql = require('mssql');
const config = require('../config/database');

const connectToDatabase = async () => {
    try {
        console.log('Đang cố gắng kết nối đến SQL Server...');
        console.log('Cấu hình kết nối:', JSON.stringify(config, null, 2));
        await sql.connect(config);
        console.log('Kết nối thành công đến SQL Server trên cổng 3001');
    } catch (err) {
        console.error('Lỗi kết nối đến SQL Server:', err);
        console.error('Chi tiết lỗi:', err.stack);
        throw err;
    }
};

const executeQuery = async (query, params = {}) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('params', sql.VarChar, JSON.stringify(params))
            .query(query);
        return result.recordset;
    } catch (err) {
        console.error('Lỗi thực thi truy vấn:', err);
        throw err;
    }
};


const closeConnection = async () => {
    try {
        await sql.close();
        console.log('Đã đóng kết nối đến SQL Server');
    } catch (err) {
        console.error('Lỗi khi đóng kết nối:', err);
    }
};

module.exports = {
    connectToDatabase,
    executeQuery,
    closeConnection
};