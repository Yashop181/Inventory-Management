const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req,res) =>{
    const {name,email,password,role} = req.body;

    try{
        const user = new User({
            name,
            email,
            password,
            role
        });
        await user.save();
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET,{
            expiresIn: '1h'
        });
        res.status(201).json({ success: true, token });
    }
    catch(err)
    {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.login = async(req,res) =>{
    const {email,password}= req.body;
    try {
        const user  = await User.findOne({email});
        if(!user)
            {
                return res.status(400).json({ success: false, message: 'Invalid Credentials' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch)
            {
                return res.status(400).json({ success: false, message: 'Invalid Credentials' });
            }
        
        const token = jwt.sign({id: user._id, role: user.role},process.env.JWT_SECRET,{
            expiresIn: '1h'
        });
        res.status(200).json({ success: true, token });

    } catch (error) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};