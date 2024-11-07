const express = require('express');
const ProductController = require('../controllers/ProductController');
// const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
router.post('/', ProductController.createProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/all', ProductController.getAllProducts);
router.get('/search', ProductController.searchProducts);
module.exports = router;