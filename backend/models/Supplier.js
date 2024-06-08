const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contactInfo:{
        type: String,
        required: true
    },
    products:[
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Supplier', SupplierSchema);