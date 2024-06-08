const Order = require('../models/Order');

exports.getOrders = async (req,res) =>{
    try {
        const orders = await Order.find().populate('products.product');
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getOrder = async (req,res) =>{
    try {
        const order = await Order.findById(req.params.id).populate('products.product');
        if(!order)
            {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
            res.status(200).json({success: true, data:order});
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addOrder = async (req,res)=>{
    const {products, totalAmount} = req.body;

    try {
        const order = new Order({
            products,
            totalAmount
        });
        await order.save();
        res.status(201).json({ success: true, data: order });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateOrder = async(req,res) =>{
    try {
        let order = await Order.findById(req.params.id);
        if(!order)
            {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }

            order = await Order.findByIdAndUpdate(req.params.id, req.body, {
                new : true,
                runValidators: true
            });
            res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteOrder = async (req,res) =>{
    try {
        const order= await Order.findById(req.params.id);
        if(!order)
            {
                return res.status(404).json({ success: false, message: 'Order not found' });
            }
            await order.remove();
            res.status(200).json({success: true, message: 'Order removed'})
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

