const express = require('express');
const ProductController = require('../controllers/ProductController');
const router = express.Router();

router.post('/', ProductController.createProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);
router.get('/all', ProductController.getAllProducts);
router.get('/:id', ProductController.getDetailProduct);
router.get('/search', ProductController.searchProduct);
router.post('/review/:prId', ProductController.createProductReview);
router.get('/rating/:id', ProductController.getRatingProduct);
router.get('/comment/:id', ProductController.getCommentProduct);

module.exports = router;