import './home.css'
import Homeproduct from './home_product'
const Home = ({ addtocart }) => {


    return (
        <>
            <div className='home'>
                <div className='trending'>
                    <div className='container'>
                        <div className='left_box'>
                            <div className='products'>
                                <div className='container'>
                                    {
                                        Homeproduct.map((curElm) => {
                                            return (
                                                <>
                                                    <div className='box'>
                                                        <div className='img_box'>
                                                            <img src={curElm.image} alt=''></img>
                                                        </div>
                                                        <div className='info'>
                                                            <h3>{curElm.Name}</h3>
                                                            <p>${curElm.price}</p>
                                                            <button className='btn' onClick={() => addtocart(curElm)}>Add to cart</button>
                                                        </div>
                                                    </div>
                                                </>
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