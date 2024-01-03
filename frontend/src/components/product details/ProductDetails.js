import React, { Fragment, useEffect, useState } from 'react'
import './ProductDetails.css'
import ImageSlider from './image slider/ImageSlider'
import { SliderData } from './image slider/SliderData'
import ReactStars from 'react-rating-stars-component'
// import Loader from '../layout/loader/Loader'
import load from '../images/loading.gif'

import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReviewCard from './product review/ReviewCard'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'

const ProductDetails = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const { id } = useParams()

  const { loading, product, error } = useSelector(state => state.productDetails)

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert])

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.2)",
    activeColor: "tomato",
    value: product ? product.ratings : 0,
    isHalf: true,
    name: product ? product.name : "",
    size: 20
  }

  const [quantity, setQuantity] = useState(1)

  const incQuantity = () => {
    if(product.stock <= quantity) return;
    const qty = quantity+1
    setQuantity(qty)
  }

  const decQuantity = () => {
    if(quantity <= 1) return;
    const qty = quantity-1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    alert.success("Items added to cart!")
  }

  return (
    <Fragment>
      {
        loading ?
          // <Loader />
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height:"100vh"}}>
          <img src={load} alt='loading' />
      </div>
          :
          <Fragment>
            {
              product ?
                <>
                <MetaData title={`${product.name} -- ECOMMERCE`} />
                  <div className='single-product-main'>
                    <div className='row'>
                      <div className='col-1'>
                        <ImageSlider slides={SliderData} />
                      </div>
                      <div className='col-2'>
                        <div className='detailsBlock-1'>
                          <h2>{product.name}</h2>
                          <p>Product # {product._id}</p>
                        </div>

                        <div className='detailsBlock-2'>
                          <p>
                            Brand new factory-sealed Lenovo Legion 5 Pro 2021 powerful gaming laptop with Ryzen 7 5800H processor featuring Octa-core (8-core) CPU, NVIDIA GeForce RTX 3060 Graphics Card with 6GB of GDDR6 VRAM, 16-inch IPS display with WQXGA (2560 x 1600 pixels) resolution, 400 nits brightness 165Hz refresh rate, 100% sRGB Color Coverage, Dolby Vision, 16GB DDR4 RAM (expandable), 1TB SSD Storage, RGB Backlight Keyboard
                          </p>
                        </div>

                        <div className='detailsBlock-3'>
                          <div className='detailsBlock-3-1'>
                            <ReactStars className="react-stars" {...options} />
                            <span>({product.numOfReviews} Reviews)</span>

                            <button className='submitReview'>Submit Review</button>
                          </div>

                          <div className='detailsBlock-3-2'>
                            Status:{" "}
                            <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                              {product.stock < 1 ? "Out of Stock" : "In Stock"}
                            </b>
                          </div>
                        </div>

                        <div className='detailsBlock-4'>
                          <h3>{`NRP ${product.price}`}</h3>
                          <div className='detailsBlock-4-1'>
                            <div className='detailsBlock-4-1-1'>
                              <button onClick={decQuantity}>-</button>
                              <input readOnly type='number' value={quantity} />
                              <button onClick={incQuantity}>+</button>
                            </div>{" "}
                            <button onClick={addToCartHandler}>Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {
                    product.reviews && product.reviews[0] ? (
                      <>
                        <h3 className='reviews-txt '>REVIEWS</h3>
                        <div className='reviews'>
                          {
                            product.reviews &&
                            product.reviews.map((review) => <ReviewCard review={review} />)
                          }
                        </div>
                      </>
                    ) : ""
                  }
                </>

                : <div className='empty'></div>
            }
          </Fragment>
      }
    </Fragment>

  )
}

export default ProductDetails
