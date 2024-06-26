import React from 'react'
import { Routes, Route } from 'react-router';
import Home from './home';
import Cart from './cart';
import Contact from './contact';
import Payment from '../comp/payment';
import Login from './login';
import Register from './register';
import Profile from './profile';
import AccessDenied from './access-denied';
const Rout = ({ addtocart, cart, setCart }) => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home addtocart={addtocart} />} />
                <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />} />
                <Route path='/contact' element={<Contact />} />
                <Route path="/payment" element={<Payment cart={cart} setCart={setCart} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/access-denied' element={<AccessDenied />} />
            </Routes>
        </>
    )
}

export default Rout