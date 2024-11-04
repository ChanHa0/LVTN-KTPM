const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/create', authMiddleware, ProductController.createProduct);
router.put('/update/:id', authMiddleware, ProductController.updateProduct);
router.delete('/delete/:id', authMiddleware, ProductController.deleteProduct);
router.get('/get-all-products', ProductController.getAllProducts);
router.get('/get-product-detail/:id', ProductController.getProductDetail);
router.get('/get-featured-books', ProductController.getFeaturedBooks);

module.exports = router;