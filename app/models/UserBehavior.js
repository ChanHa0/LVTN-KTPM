// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/connectDB');

// const UserBehavior = sequelize.define('UserBehavior', {
//     ubId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     uId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     prId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     actionType: {
//         type: DataTypes.ENUM('view', 'search', 'cart', 'purchase'),
//         allowNull: false
//     },
//     timestamp: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     searchKeyword: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     timeSpent: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         comment: 'Thời gian xem sản phẩm (giây)'
//     }
// });

// module.exports = UserBehavior;