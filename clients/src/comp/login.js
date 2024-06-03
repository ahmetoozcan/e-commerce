import React from 'react';
import { useState, useContext } from 'react';
import './login.css';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from '../provider/UserProvider';
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const [data, setData] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[0-9]).{8,}$/;

        if (data.email === '' || data.password === '') {
            toast.error('Please fill all the fields!', { containerId: 'login' });
            return;
        }

        if (!data.email.match(emailRegex)) {
            toast.error('Invalid email!', { containerId: 'login' });
            return;
        }

        if (!data.password.match(passwordRegex)) {
            toast.error('Password must be at least 8 characters long!', { containerId: 'login' });
            return;
        }

        const queryParams = new URLSearchParams({
            username: data.email,
            password: data.password
        }).toString();


        await axios.post(`${process.env.REACT_APP_API_BASE_URI}login/process?${queryParams}`, {}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                toast.success('Login successful! Redirecting to main page... ',
                    { containerId: 'login' }
                );
                axios.get(`${process.env.REACT_APP_API_BASE_URI}api/private/user/auth`, {}, {
                    withCredentials: true
                }).then((response) => {
                    if (response.status === 200) {
                        setUser(response.data);
                        setTimeout(() => {
                            navigate('/');
                        }, 1500);
                    }
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                toast.error('Invalid credentials!', { containerId: 'login' });
            }
        }).catch((error) => {
            if (error.response.status === 401)
                toast.error("Invalid credentials!", { containerId: 'login' });
            else
                toast.error("Something went wrong!", { containerId: 'login' });

        });

    }


    return (
        <div className="box" style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="form-table">
                <h3>Login</h3>
                <div className="form-group">
                    <label htmlFor="email">E-mail</label>
                    <input type="text" id="email" name="email" value={data.email} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={data.password} onChange={handleInputChange} required />
                </div>
                <div className="form-actions">
                    <button type="submit" onClick={handleSubmit}>Login</button>
                </div>
            </div>
            <div className='register'>
                <h4 className='register-text'>Don't have an account? <a className='register-link' href='/register'>Register</a></h4>
            </div>
            <ToastContainer containerId={"login"} />
        </div>
    );
}

export default Login;