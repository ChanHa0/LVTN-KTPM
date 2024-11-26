// const { UserBehavior, Product } = require('../models');
// const { Op } = require('sequelize');

// const RecommendationService = {
//     async getRecommendations(userId) {
//         try {
//             // 1. Lấy hành vi gần đây của user
//             const recentBehaviors = await UserBehavior.findAll({
//                 where: {
//                     uId: userId,
//                     timestamp: {
//                         [Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 ngày gần nhất
//                     }
//                 },
//                 order: [['timestamp', 'DESC']]
//             });

//             // 2. Tính điểm cho từng sản phẩm
//             const productScores = {};

//             recentBehaviors.forEach(behavior => {
//                 const score = this.calculateScore(behavior);
//                 if (!productScores[behavior.prId]) {
//                     productScores[behavior.prId] = 0;
//                 }
//                 productScores[behavior.prId] += score;
//             });

//             // 3. Lấy các sản phẩm tương tự dựa trên sản phẩm có điểm cao nhất
//             const topProducts = await this.getSimilarProducts(productScores);

//             return topProducts;

//         } catch (error) {
//             console.error('Lỗi getRecommendations:', error);
//             return [];
//         }
//     },

//     calculateScore(behavior) {
//         // Tính điểm dựa trên loại hành vi
//         const scores = {
//             view: 1,
//             search: 2,
//             cart: 3,
//             purchase: 5
//         };

//         let score = scores[behavior.actionType] || 0;

//         // Tăng điểm nếu user dành nhiều thời gian xem
//         if (behavior.timeSpent > 60) {
//             score *= 1.5;
//         }

//         // Giảm điểm cho hành vi cũ
//         const daysSinceBehavior = (Date.now() - behavior.timestamp) / (24 * 60 * 60 * 1000);
//         score *= Math.exp(-daysSinceBehavior / 30);

//         return score;
//     },

//     async getSimilarProducts(productScores) {
//         // Lấy top 5 sản phẩm có điểm cao nhất
//         const topProductIds = Object.entries(productScores)
//             .sort(([, a], [, b]) => b - a)
//             .slice(0, 5)
//             .map(([id]) => id);

//         const products = await Product.findAll({
//             where: {
//                 prId: {
//                     [Op.in]: topProductIds
//                 }
//             }
//         });

//         return products;
//     }
// };

// module.exports = RecommendationService;