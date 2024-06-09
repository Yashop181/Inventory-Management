import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store';
import { loadUser } from './store/slices/authSlice';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Products from './components/Products';
import Orders from './components/Orders';
import Suppliers from './components/Suppliers';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/suppliers" element={<Suppliers />} />
                </Routes>
            </Router>
        </Provider>
    );
};

export default App;
