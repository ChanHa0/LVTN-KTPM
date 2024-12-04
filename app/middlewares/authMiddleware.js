// const jwt = require('jsonwebtoken');

// // Kiểm tra người dùng đã đăng nhập
// const isAuthenticated = (req, res, next) => {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) {
//         return res.status(401).json({ message: "Không tìm thấy token xác thực" });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//         req.user = decoded; // Lưu thông tin người dùng từ token
//         next();
//     } catch (error) {
//         res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
//     }
// };

// // Phân quyền (role-based access control)
// const authorizeRoles = (...roles) => {
//     return (req, res, next) => {
//         if (!roles.includes(req.user.role)) {
//             return res.status(403).json({ message: "Không có quyền truy cập" });
//         }
//         next();
//     };
// };

// module.exports = { isAuthenticated, authorizeRoles };
