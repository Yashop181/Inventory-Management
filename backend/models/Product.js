const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    SKU:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
}) 

module.exports = mongoose.model('Product',ProductSchema);