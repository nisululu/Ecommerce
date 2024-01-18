import React, { Fragment, useEffect } from 'react'
import './Home.css'
import Product from '../product/Product'
import MetaData from '../layout/MetaData'
import { clearErrors, getAllProducts } from '../../actions/productAction'
import { useSelector, useDispatch } from 'react-redux'
// import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'
import load from '../images/loading.gif'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const alert = useAlert()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, products, error } = useSelector(state => state.products)

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getAllProducts())
    }, [dispatch, error, alert])

    const handleClick = () => {
        navigate("/products")
    }

    return (
        <Fragment>
            {
                loading ?
                    <Fragment>
                        {/* <Loader /> */}
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height:"100vh"}}>
                            <img src={load} alt='loading' />
                        </div>
                    </Fragment> :
                    <Fragment>
                        <MetaData title="ECOMMERCE" />
                        <div className='home-main'>
                            <div className='home-text'>
                                <h1><span>WELCOME</span> TO OUR WEBSITE</h1>
                                <p>Please feel free to visit our awesome products with reasonable prices.</p>

                                <button className='home-text-btn'
                                onClick={handleClick}
                                >SHOP NOW</button>
                            </div>
                        </div>
                        <div className='featured-product'>
                            <h2 className='featured-product-txt'>Featured Products</h2>
                            <div className='product-container'>
                                {
                                    products && products.map((product) => {
                                        return <Product key={product._id} product={product} />
                                    })
                                }
                            </div>
                        </div>
                    </Fragment>
            }
        </Fragment>
    )
}

export default Home
