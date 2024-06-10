import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/slices/authSlice';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
    };

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={onChange} required autoComplete='user-email' />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" value={formData.password} onChange={onChange} required autoComplete='user-password' />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
