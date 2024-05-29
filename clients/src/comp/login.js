import React from 'react';
import { useState } from 'react';
import './login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="box" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="form-table">
                <h3>Login</h3>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" onClick={() => { }}>Login</button>
                </div>
            </div>
            <div className='register'>
                <h4 className='register-text'>Don't have an account? <a className='register-link' href='/register'>Register</a></h4>
            </div>
        </div>
    );
}

export default Login;