import React, { useState, useEffect } from 'react';
import './payment.css';

const Payment = ({ cart, setCart }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        district: '',
        city: '',
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [paymentMessage, setPaymentMessage] = useState('');
    const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);

    useEffect(() => {
        if (isPurchaseComplete) {
            setCart([]);
        }
    }, [isPurchaseComplete, setCart]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            formData.firstName &&
            formData.lastName &&
            formData.phone &&
            formData.address &&
            formData.district &&
            formData.city &&
            formData.cardName &&
            formData.cardNumber &&
            formData.expiryDate &&
            formData.cvv
        ) {
            setPaymentMessage('Payment successfully completed!');
            setIsPurchaseComplete(true);
        } else {
            setPaymentMessage('An error occurred during payment. Please check your information.');
        }
    };

    const cancelPurchase = () => {
        setPaymentMessage('Order canceled.');
    };


    return (
        <div className="payment">
            <h2>Checkout Page</h2>
            {!isPurchaseComplete ? (
                <>
                    <div className="form-container">
                        <div className="payment-form-table">
                            <h3>Address Information</h3>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="district">District</label>
                                <input type="text" id="district" name="district" value={formData.district} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="city">City</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                            </div>
                        </div>
                        <div className="payment-form-table">
                            <h3>Payment Information</h3>
                            <div className="form-group">
                                <label htmlFor="cardName">Cardholder Name</label>
                                <input type="text" id="cardName" name="cardName" value={formData.cardName} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardNumber">Card Number</label>
                                <input type="text" id="cardNumber" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expiryDate">Expiry Date</label>
                                <input type="text" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cvv">CVV</label>
                                <input type="text" id="cvv" name="cvv" value={formData.cvv} onChange={handleInputChange} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" onClick={handleSubmit}>Make Payment</button>
                    </div>
                </>
            ) : (
                <div>
                    <p>{paymentMessage}</p>
                    <button className="cancel-button" onClick={cancelPurchase}>Cancel Purchase</button>

                </div>
            )}
        </div>
    );
};

export default Payment;
