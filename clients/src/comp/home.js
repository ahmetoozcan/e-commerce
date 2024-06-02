import { useState } from 'react'
import './home.css'
import axios from 'axios'

const Home = ({ addtocart }) => {

    const [product, setProduct] = useState([])

    useState(() => {

        axios.get(`${process.env.REACT_APP_API_BASE_URI}api/public/product/all`, {}, {
            withCredentials: true
        }).then((response) => {
            setProduct(response.data);
        }).catch((error) => {
            console.error(error);
        });

    }, [])

    return (
        <>
            <div className='home'>
                <div className='trending'>
                    <div className='container'>
                        <div className='left_box'>
                            <div className='products'>
                                <div className='container'>
                                    {
                                        product.map((curElm) => {
                                            return (
                                                <div className='box' key={curElm.id}>
                                                    <div className='img_box'>
                                                        <img src={curElm.image_path} alt=''></img>
                                                    </div>
                                                    <div className='info'>
                                                        <h3>{curElm.name}</h3>
                                                        <p>${curElm.price}</p>
                                                        <button className='btn' onClick={() => addtocart(curElm)}>Add to cart</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home