const express = require('express');
const {getOrders, getOrder,addOrder,updateOrder,deleteOrder} = require('../controllers/orderController');
const {protect,authorize} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
.get(protect, getOrders)
.post(protect, authorize('admin ','manager'),addOrder);

router.route(':/id')
.get(protect, getOrder)
.put(protect, authorize('admin ','manager'),updateOrder)
.delete(protect, authorize('admin'),deleteOrder)
module.exports = router;