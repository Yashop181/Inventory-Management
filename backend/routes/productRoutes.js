const express = require('express');
const {getProducts,getProduct,addProduct,updateProduct,deleteProduct} = require('../controllers/productController');
const {protect, authorize} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
.get(protect,getProducts)
.post(protect, authorize('admin', 'manager'),addProduct);

router.route(':id')
.get(protect, getProduct)
.put(protect, authorize('admin', 'manager'), updateProduct)
.delete(protect, authorize('admin'), deleteProduct);

module.exports = router;