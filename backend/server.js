const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const connectDB = require('./config/db');
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();
// Routes Starting from here
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/suppliers', require('./routes/supplierRoutes'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});