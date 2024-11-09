const express = require('express');
const ProductController = require('../controllers/ProductController');

const router = express.Router();
router.post('/', ProductController.createProduct);
router.patch('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/all', ProductController.getAllProduct);
router.get('/:id', ProductController.getDetailProduct);
router.get('/search', ProductController.searchProduct);

module.exports = router;