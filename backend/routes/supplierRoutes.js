const express = require('express');
const { getSuppliers,getSupplier,addSupplier,updateSupplier,deleteSupplier} = require('../controllers/supplierController');
const {protect, authorize} = require('../middleware/authMiddleware');
const router = express.Router();
router.route('/')
    .get(protect, getSuppliers)
    .post(protect, authorize('admin', 'manager'), addSupplier);

router.route('/:id')
    .get(protect, getSupplier)
    .put(protect, authorize('admin', 'manager'), updateSupplier)
    .delete(protect, authorize('admin'), deleteSupplier);

module.exports = router;