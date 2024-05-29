import React, { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './nav.css';

const Nav = ({ cart }) => {
    const isAuthenticated = true;
    const user = {
        name: 'John Doe',
        email: 'ahmet@mail.com'
    };
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        setCartItemCount(cart.reduce((total, item) => total + item.qty, 0));
    }, [cart]);

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
                        {isAuthenticated ? <li><Link to='/profile' className='link'>Profile</Link></li> : null}
                    </ul>
                </div>
                <div className='box'>
                    <div className='user_profile'>
                        {isAuthenticated ? (
                            <>
                                <div className='info'>
                                    <h2>{user.name}</h2>
                                    <p>{user.email}</p>
                                </div>
                            </>
                        ) : (
                            <div className='user' onClick={() => { window.location.href = "/login" }}>
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
                </div>
            </div>
            <div className='last_header' />
        </div>
    );
}

export default Nav;
