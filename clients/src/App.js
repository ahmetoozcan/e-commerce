import React, { useState } from 'react';
import Nav from './comp/nav';
import { BrowserRouter } from 'react-router-dom';
import Rout from './comp/rout';
import Footer from './comp/footer';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import { UserProvider } from './provider/UserProvider';

const App = () => {
    const [cart, setCart] = useState([]);


    const addtocart = (product) => {
        const exist = cart.find((x) => x.id === product.id);
        if (exist) {
            toast.error('Product already in cart', {
                containerId: 'default'
            });
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
            toast.success('Product added to cart', {
                containerId: 'default'
            });
        }
    }


    return (
        <UserProvider>
            <BrowserRouter>
                <Nav cart={cart} />
                <Rout setCart={setCart} cart={cart} addtocart={addtocart} />
                <Footer />
            </BrowserRouter>
            <ToastContainer containerId={"default"} />
        </UserProvider>
    );
}

export default App;
