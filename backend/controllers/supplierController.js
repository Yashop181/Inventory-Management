const Supplier = require('../models/Supplier');


exports.getSuppliers = async (req,res) =>{
    try {
        const suppliers = await Supplier.find().populate('products');
        res.status(200).json({ success: true, data: suppliers });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getSupplier = async (req,res) =>{
    try {
        const supplier = await Supplier.findById(req.params.id).populate('products');
        if(!supplier)
            {
                return res.status(404).json({ success: false, message: 'Supplier not found' });   
            }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

exports.addSupplier = async (req,res) =>{
    const  {name ,contactInfo, products} = req.body;
    try {
        const supplier = new Supplier({
            name,contactInfo,products
        });
        await supplier.save();
        res.status(201).json({ success: true, data: supplier });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.updateSupplier = async (req,res)=>{
    try {
        let supplier = await Supplier.findById(req.params.id);

        if(!supplier)
            {
                return res.status(404).json({ success: false, message: 'Supplier not found' });
            }
        supplier = await Supplier.findOneAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({success: true, data: supplier});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteSupplier = async (req,res) =>{
    try {
        const supplier = await Supplier.findById(req.params.id);
        if(!supplier)
            {
                return res.status(404).json({ success: false, message: 'Supplier not found' });   
            }
            await supplier.remove();
            res.status(200).json({ success: true, message: 'Supplier removed' });
    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};