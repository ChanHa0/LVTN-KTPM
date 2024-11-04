const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generateAccessToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

const generateRefreshToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
};

const verifyToken = (token, secretKey) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (error, decoded) => {
            if (error) {
                resolve({
                    status: 'ERR',
                    message: 'Token không hợp lệ hoặc đã hết hạn'
                });
            }
            resolve({
                status: 'OK',
                data: decoded
            });
        });
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken
};