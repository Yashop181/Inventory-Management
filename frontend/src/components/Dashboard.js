import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => (
    <div>
        <h1>Dashboard</h1>
        <nav>
            <ul>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/suppliers">Suppliers</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    </div>
);

export default Dashboard;
