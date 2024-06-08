const Product = require('../models/Product');

exports.getProducts = async (req,res) =>{
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addProduct = async (req,res) =>{
    const {name ,description,SKU, price,category,stock} = req.body;

    try {
        const product = new Product({
            name,
            description,
            SKU,
            price,
            category,
            stock
        });

        await product.save();
        res.status(201).json({ success: true, data: product });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.updateProduct = async (req,res)=>{
    try {
        let product = await Product.findById(req.params.id);
        
        if(!product)
            {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        });
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.deleteProduct = async (req,res) =>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product)
            {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            await product.remove();
            res.status(200).json({ success: true, message: 'Product removed' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};