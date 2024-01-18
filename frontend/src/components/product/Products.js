import React, { Fragment, useEffect, useState } from 'react'
import './Product.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts, clearErrors } from '../../actions/productAction'
import Product from './Product'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { faAngleRight, faAngleLeft, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import load from '../images/loading.gif'
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'
import { categories } from './categories'

const Products = () => {

    const dispatch = useDispatch()

    const alert = useAlert()

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000000])
    const [category, setCategory] = useState("")

    const priceHandler = (event, newPrice) => {
        setPrice(newPrice)
    }

    const setCurrentPageNo = (e) => {
        setCurrentPage(e)
    }

    const { products, loading, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(state => state.products)

    const { keyword } = useParams()

    useEffect(() => {
        if(error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getAllProducts(keyword, currentPage, price, category))
    }, [dispatch, keyword, currentPage, price, category])

    let count = filteredProductsCount 

    return (
        <Fragment>
            {
                loading ?
                    // <Loader />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <img src={load} alt='loading' />
                    </div>

                    :
                    <Fragment>
                        <MetaData title="PRODUCTS -- ECOMMERCE"/>
                        <div className='all-product-main'>
                            <h2 className='all-products-txt'>PRODUCTS</h2>
                            <div className='all-products'>
                                {
                                    products && products.map((product) => <Product key={product._id} product={product} />)
                                }
                            </div>
                        </div>

                        <div className='filter-box'>
                                <Typography>Price</Typography>
                                <Slider 
                                   value={price}
                                   onChange={priceHandler}
                                   valueLabelDisplay='auto'
                                   aria-labelledby='range-slider'
                                   min={0}
                                   max={1000000}
                                   size="small"
                                />

                                <Typography>Categories</Typography>
                                <ul className='category-box'>
                                    {
                                        categories.map((category) => (
                                           <li
                                            className='category-link'
                                            key={category}
                                            onClick={()=> setCategory(category)}
                                           >
                                            {category}
                                           </li> 
                                        ))
                                    }
                                </ul>
                        </div>

                        {
                            resultPerPage < count && (
                                <div className='pagination-box'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText={<FontAwesomeIcon className='pagination-icon' icon={faAngleRight} />}
                                        prevPageText={<FontAwesomeIcon className='pagination-icon' icon={faAngleLeft} />}
                                        firstPageText={<FontAwesomeIcon className='pagination-icon' icon={faAnglesLeft} />}
                                        lastPageText={<FontAwesomeIcon className='pagination-icon' icon={faAnglesRight} />}
                                        itemClass='page-item'
                                        linkClass='page-link'
                                        activeClass='page-item-active'
                                        activeLinkClass='page-link-active'
                                    />
                                </div>
                            )
                        }
                    </Fragment>
            }
        </Fragment>
    )
}

export default Products
