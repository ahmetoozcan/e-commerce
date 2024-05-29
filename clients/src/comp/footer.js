import React from 'react'
import './footer.css'
const Footer = () => {
    return (
        <>
            <div className='footer'>
                <div className='container'>
                    <div className='right_box'>
                        <div className='bottom'>
                            <div className='box'>
                                <h3>Your Account</h3>
                                <ul>
                                    <li>About us</li>
                                    <li>Account</li>
                                    <li>Payment</li>
                                    <li>Sales</li>
                                </ul>
                            </div>
                            <div className='box'>
                                <h3>products</h3>
                                <ul>
                                    <li>Delivery</li>
                                    <li>Track Oder</li>
                                    <li>New product</li>
                                    <li>old product</li>
                                </ul>
                            </div>
                            <div className='box'>
                                <h3>contact us</h3>
                                <ul>
                                    <li>Büyükdere, Osmangazi Ünv. No:38, 26040 Odunpazarı/Eskişehir</li>
                                    <li>+90 (222) 420 1337</li>
                                    <li className='email'>ogu@edu.tr</li>
                                </ul>
                            </div>
                            <div className='header'>
                                <img src='image/logo.webp' alt=''></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer