import React from 'react';
import { useState } from 'react';
import './register.css';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[0-9]).{8,}$/;

        if (!emailRegex.test(formData.email)) {
            toast.error('Invalid email!', { containerId: 'register' });
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            toast.error('Invalid password! Password should be at least 8 characters long and contain at least one number.', { containerId: 'register' });
            return;
        }

        if (formData.email === '' || formData.password === '' || formData.confirmPassword === '' || formData.firstName === '' || formData.lastName === '') {
            toast.error('Please fill all the fields!', { containerId: 'register' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match!', { containerId: 'register' });
            return;
        }

        axios.post(`${process.env.REACT_APP_API_BASE_URI}api/public/register`, formData, {
            withCredentials: true
        }).then((response) => {
            if (response.status === 201) {
                toast.success('Registration successful! Redirecting to login page...', { containerId: 'register' });
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                toast.error('Registration failed!', { containerId: 'register' });
            }
        }).catch((error) => {
            toast.error('Something went wrong!', { containerId: 'register' });
        });
    }

    return (
        <div className="box" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="form-table">
                <h3>Register</h3>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="name">First Name</label>
                    <input type="name" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Last Name</label>
                    <input type="surname" id="surname" name="surname" value={formData.surname} onChange={handleInputChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" onClick={handleSubmit}>Register</button>
                </div>
            </div>
            <div className='login'>
                <h4 className='login-text'>Already registered? <a className='login-link' href="/login">Login</a></h4>
            </div>
            <ToastContainer containerId={"register"} />
        </div>
    );
}

export default Register;