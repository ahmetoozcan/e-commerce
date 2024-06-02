import React, { useContext, useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoExitOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import './nav.css';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';


const Nav = ({ cart }) => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(cart.reduce((total, item) => total + item.qty, 0));
    }, [cart]);

    const handleLogout = (e) => {
        e.preventDefault();

        axios.get(`${process.env.REACT_APP_API_BASE_URI}logout`, {}, {
            withCredentials: true
        }).then((response) => {
            if (response.status === 200) {
                toast.success('Logout successful! Redirecting to main page... ',
                    {
                        containerId: 'nav'
                    });

                setUser(null);
                navigate('/');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className='header'>
            <div className='mid_header'>
                <div className='logo'>
                    <Link to="/">
                        <img src='image/logo.webp' alt='logo' />
                    </Link>
                </div>
                <div className='nav'>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        <li><Link to='/cart' className='link'>Cart</Link></li>
                        <li><Link to='/about' className='link'>About</Link></li>
                        <li><Link to='/contact' className='link'>Contact</Link></li>
                        {user ? <li><Link to='/profile' className='link'>Profile</Link></li> : null}
                    </ul>
                </div>
                <div className='box'>
                    <div className='user_profile'>
                        {user ? (
                            <>
                                <div className='info'>
                                    <h2>{user.name} {user.surname}</h2>
                                    <p>{user.email}</p>
                                </div>
                            </>
                        ) : (
                            <div className='user' onClick={() => { navigate("/login") }}>
                                <div className='info'>
                                    <span className="login-text-home">Login</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='cart-container'>
                        <Link to='/cart'>
                            <FiShoppingCart className='cart-icon' />
                        </Link>
                        <span className='cart-count'>{cartItemCount}</span>
                    </div>
                    {user ? <div className='logout-container'>
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', padding: '0', outline: 'none' }}>
                            <IoExitOutline className='logout-icon' />
                        </button>
                    </div> : null}
                </div>
            </div>
            <div className='last_header' />
            <ToastContainer containerId={"nav"} />
        </div>
    );
}

export default Nav;
