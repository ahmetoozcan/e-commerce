import React, { useState, useEffect, useContext } from 'react';
import './profile.css';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const { user, setUser } = useContext(UserContext);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URI}api/private/order/all`, {}, {
            withCredentials: true
        })
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch orders', error);
            });
    }, []);

    const handleCancelOrder = (orderId) => {
        if (!window.confirm('Are you sure you want to cancel this order?')) {
            return;
        }
        axios.put(`${process.env.REACT_APP_API_BASE_URI}api/private/order/cancel?orderId=${orderId}&userId=${user.id}`, {}, {
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    setOrders(orders.map(order => {
                        if (order.id === orderId) {
                            return { ...order, status: 'CANCELLED' };
                        }
                        return order;
                    }));
                    toast.success('Order cancelled successfully',
                        {
                            containerId: 'profile-toast'
                        });
                } else {
                    toast.error('Failed to cancel order',
                        {
                            containerId: 'profile-toast'
                        });
                }
            })
            .catch(error => {
                console.error('Failed to cancel order', error);
            });
    };

    const handleRemoveAccount = (userId) => {
        if (!window.confirm('Are you sure you want to delete your account?')) {
            return;
        }
        axios.delete(`${process.env.REACT_APP_API_BASE_URI}api/private/user/delete?userId=${userId}`, {}, {
            withCredentials: true
        })
            .then(response => {
                if (response.status === 200) {
                    toast.success('User account delete successfully',
                        {
                            containerId: 'profile-toast'
                        });
                    axios.get(`${process.env.REACT_APP_API_BASE_URI}logout`, {
                        withCredentials: true
                    }).then((response) => {
                        if (response.status === 200) {
                            setUser(null);
                            setTimeout(() => {
                                navigate('/');
                            }, 2000);
                        }
                    }).catch((error) => {
                        toast.error('Failed to delete user account',
                            {
                                containerId: 'profile-toast'
                            });
                    });
                } else {
                    toast.error('Failed to delete user account',
                        {
                            containerId: 'profile-toast'
                        });
                }
            })
            .catch(error => {
                console.error('Failed to delete user account', error);
            });
    };

    return (
        <div className="orders-container">
            <h1 className='profile-heading'>Profile</h1>
            <button className='remove-account-button' onClick={() => handleRemoveAccount(user.id)}>Delete Account</button>
            <h1 className='your-orders-heading'>Your Orders</h1>
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <div className="order-summary">
                        <div className="order-date"><strong>Date:</strong> {order.date}</div>
                        <div className="order-status"><strong>Status:</strong> {order.status}</div>
                        <div className="order-total"><strong>Total:</strong> {order.total}</div>
                    </div>
                    <div className="order-details">
                        <details>
                            <summary>Order Details</summary>
                            <ul>
                                {order.products.map((product, index) => (
                                    <li key={index} className="product-item">
                                        <img src={product.image_path} alt={product.name} className="product-image" />
                                        <span className="product-name">{product.name}</span>
                                        <span className="product-quantity">Quantity: {product.quantity}</span>
                                        <span className="product-price">Price: {product.price}</span>
                                    </li>
                                ))}
                            </ul>
                        </details>
                    </div>

                    {
                        order.status !== "CANCELLED"
                            ? <button className='cancel-order-button' onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                            : null
                    }
                </div>
            ))}
            <ToastContainer containerId={"profile-toast"} />
        </div>
    );
};

export default Profile;
