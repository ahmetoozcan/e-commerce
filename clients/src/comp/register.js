import React from 'react';
import { useState } from 'react';
import './register.css';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
                    <label htmlFor="firstName">First Name</label>
                    <input type="firstName" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="lastName" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" onClick={() => { }}>Register</button>
                </div>
            </div>
            <div className='login'>
                <h4 className='login-text'>Already registered? <a className='login-link' href="/login">Login</a></h4>
            </div>
        </div>
    );
}

export default Register;