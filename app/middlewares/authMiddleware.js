// const jwt = require('jsonwebtoken');

// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];

//         if (!token) {
//             return res.status(401).json({
//                 status: 'ERR',
//                 message: 'Không tìm thấy token xác thực'
//             });
//         }

//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             status: 'ERR',
//             message: 'Token không hợp lệ hoặc đã hết hạn'
//         });
//     }
// };

// module.exports = authMiddleware;