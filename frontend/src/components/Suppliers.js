import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSuppliers } from '../store/slices/supplierSlice';

const Suppliers = () => {
    const dispatch = useDispatch();
    const { suppliers, loading } = useSelector((state) => state.suppliers);

    useEffect(() => {
        dispatch(fetchSuppliers());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Suppliers</h1>
            <ul>
                {suppliers.map((supplier) => (
                    <li key={supplier._id}>{supplier.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Suppliers;
