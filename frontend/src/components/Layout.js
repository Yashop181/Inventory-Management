import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/products">Products</Link></li>
                    <li><Link to="/orders">Orders</Link></li>
                    <li><Link to="/suppliers">Suppliers</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
            <Outlet />
        </div>
    );
};

export default Layout;
