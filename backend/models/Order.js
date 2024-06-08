const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    products:[
        {
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true
            },
            quantity:{
                type: Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        default : 'pending',
        enum:['pending', 'received', 'cancelled']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order',OrderSchema);