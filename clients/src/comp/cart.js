import React from 'react'
import './cart.css'
import { Link } from 'react-router-dom'
import { AiOutlineClose } from 'react-icons/ai';
const Cart = ({ cart, setCart }) => {

    // Increase Quantity of cart product
    const incqty = (product) => {
        const exist = cart.find((x) => {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => {
            return curElm.id === product.id ? { ...exist, qty: exist.qty + 1 } : curElm
        }))
    }

    // decrese Quantity of cart product
    const decqty = (product) => {
        const exist = cart.find((x) => {
            return x.id === product.id
        })
        setCart(cart.map((curElm) => {
            if (exist.qty === 1) {
                return curElm.id === product.id ? { ...exist, qty: exist.qty } : curElm
            }
            return curElm.id === product.id ? { ...exist, qty: exist.qty - 1 } : curElm
        }))
    }

    //Removing cart product
    const removeproduct = (product) => {
        const exist = cart.find((x) => {
            return x.id === product.id
        })
        if (exist.qty > 0) {
            setCart(cart.filter((curElm) => {
                return curElm.id !== product.id
            }))
        }
    }

    //Total Price
    const total = cart.reduce((price, item) => price + item.qty * item.price, 0)
    return (
        <>
            <div className='cart'>
                <h3>SHOPPING CART</h3>
                {
                    cart.length === 0 &&
                    <>
                        <div className='empty_cart'>
                            <h2>Your Shopping cart is empty</h2>
                            <Link to='/'><button>Shop Now</button></Link>
                        </div>
                    </>
                }
                <div className='container'>
                    {
                        cart.map((curElm) => {
                            return (
                                <div key={curElm}>
                                    <div className='box'>
                                        <div className='img_box'>
                                            <img src={curElm.image_path} alt=''></img>
                                        </div>
                                        <div className='detail'>
                                            <div className='info'>
                                                <h3>{curElm.name}</h3>
                                                <p>Price: ${curElm.price}</p>
                                                <p>Total: ${curElm.price * curElm.qty}</p>
                                            </div>
                                            <div className='quantity'>
                                                <button onClick={() => incqty(curElm)}>+</button>
                                                <input type='number' value={curElm.qty}></input>
                                                <button onClick={() => decqty(curElm)}>-</button>
                                            </div>
                                            <div className='icon'>
                                                <li onClick={() => removeproduct(curElm)}><AiOutlineClose /></li>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='bottom'>
                    {
                        cart.length > 0 &&
                        <>
                            <div className='Total'>
                                <h4>Sub Total: ${total}</h4>
                            </div>
                            <Link to="/payment">
                                <button>PAYMENT</button>
                            </Link>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Cart