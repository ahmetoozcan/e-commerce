import React, { useState } from 'react';
import './profile.css';

const Profile = () => {
    const [orders, setOrders] = useState([
        {
            id: '12345',
            date: '2023-05-29',
            status: 'Shipped',
            total: '$150.00',
            items: [
                { name: 'Item 1', quantity: 1, price: '$50.00' },
                { name: 'Item 2', quantity: 2, price: '$100.00' }
            ]
        },
        {
            id: '67890',
            date: '2023-05-28',
            status: 'Processing',
            total: '$250.00',
            items: [
                { name: 'Item 3', quantity: 1, price: '$100.00' },
                { name: 'Item 4', quantity: 3, price: '$150.00' }
            ]
        },
        {
            id: '11223',
            date: '2023-05-27',
            status: 'Delivered',
            total: '$300.00',
            items: [
                { name: 'Item 5', quantity: 2, price: '$200.00' },
                { name: 'Item 6', quantity: 1, price: '$100.00' }
            ]
        }
    ]);


    const handleCancelOrder = (orderId) => {
        // Implement cancel order functionality
        console.log('Cancel order:', orderId);
    };

    return (
        <div className="orders-container">
            <h1>Your Orders</h1>
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
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.quantity} x {item.price}
                                    </li>
                                ))}
                            </ul>
                            <button onClick={() => handleCancelOrder(order.id)}>Cancel Order</button>
                        </details>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Profile;
