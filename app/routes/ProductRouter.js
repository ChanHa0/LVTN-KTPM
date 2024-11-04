const express = require('express');
const ProductController = require('../controllers/ProductController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', authMiddleware, ProductController.createProduct);
router.patch('/:id', authMiddleware, ProductController.updateProduct);
router.delete('/:id', authMiddleware, ProductController.deleteProduct);
router.get('/all', ProductController.getAllProducts);
router.get('/detail/:id', ProductController.getProductDetail);
router.get('/featured', ProductController.getFeaturedBooks);

module.exports = router;