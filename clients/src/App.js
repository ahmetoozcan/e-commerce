import React, { useState } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import './App.css';

const App = () => {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);


    const addtocart = (product) => {
        const exist = cart.find((x) => x.id === product.id);
        if (exist) {
            setNotification({
                message: `Product is already in your cart.`,
                type: 'error'
            });
            setTimeout(() => {
                setNotification(null);
            }, 4000);
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
            setNotification({
                message: `Product successfully added to your cart.`,
                type: 'success'
            });
            setTimeout(() => {
                setNotification(null);
            }, 4000);
        }
    }

    console.log(cart);

    return (
        <>
            <BrowserRouter>
                <Nav cart={cart} />
                <Rout setCart={setCart} cart={cart} addtocart={addtocart} />
                <Footer />
            </BrowserRouter>
            {notification && (
                <div className={`notification ${notification.type}`}>
                    <span className="notification-message">{notification.message}</span>
                    <button className="notification-close" onClick={() => setNotification(null)}>x</button>
                </div>
            )}
        </>
    );
}

export default App;
