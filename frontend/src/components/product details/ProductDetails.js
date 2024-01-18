import React, { Fragment, useEffect, useState, useRef } from 'react'
import './ProductDetails.css'
import ImageSlider from './image slider/ImageSlider'
import ReactStars from 'react-rating-stars-component'
import load from '../images/loading.gif'

import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, reviewProduct } from '../../actions/productAction'
import { useParams } from 'react-router-dom'
import ReviewCard from './product review/ReviewCard'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import { addItemsToCart } from '../../actions/cartAction'
import { Dialog, DialogActions, DialogTitle, DialogContent, Rating, Button } from '@mui/material'
import { PRODUCT_REVIEW_RESET } from '../../constants/productConstant'


const ProductDetails = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const { id } = useParams()

  const { loading, product, error } = useSelector(state => state.productDetails)
  const { success, error: reviewError } = useSelector(state => state.productReview)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }

    if (reviewError) {
      alert.error(error)
      dispatch(clearErrors)
    }

    if (success) {
      alert.success("Review Submitted Successfully")
      dispatch({ type: PRODUCT_REVIEW_RESET })
    }

    dispatch(getProductDetails(id))
  }, [dispatch, id, error, alert, success, reviewError])

  const windowWidth = useRef(window.innerWidth)

  const options = {
    size: windowWidth.current <= 600 ? "small" : "large",
    value: product ? product.ratings : 0,
    precision: 0.5,
    name: product ? product.name : "",
    readOnly: true,
  }

  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")

  const incQuantity = () => {
    if (product.stock <= quantity) return;
    const qty = quantity + 1
    setQuantity(qty)
  }

  const decQuantity = () => {
    if (quantity <= 1) return;
    const qty = quantity - 1
    setQuantity(qty)
  }

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity))
    alert.success("Items added to cart!")
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // const myForm = new FormData()
    // myForm.set("rating",rating)
    // myForm.set("comment",comment)
    // myForm.set("productId",id)

    const reviewData = {
      "rating": rating,
      "comment": comment,
      "productID": id
    }

    dispatch(reviewProduct(reviewData))

    setOpen(false)
  }

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
            {
              product ?
                <>
                  <MetaData title={`${product.name} -- ECOMMERCE`} />
                  <div className='single-product-main'>
                    <div className='row'>
                      <div className='col-1'>
                        <ImageSlider slides={product.images} />
                      </div>
                      <div className='col-2'>
                        <div className='detailsBlock-1'>
                          <h2>{product.name}</h2>
                          <p>Product # {product._id}</p>
                        </div>

                        <div className='detailsBlock-2'>
                          <p>
                            {product.description}
                          </p>
                        </div>

                        <div className='detailsBlock-3'>
                          <div className='detailsBlock-3-1'>
                            <Rating className="react-stars" {...options} />
                            <span>({product.numOfReviews} Reviews)</span>

                            <button className='submitReview' onClick={handleClickOpen}>Submit Review</button>
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
                            <button disabled={product.stock < 1 ? true : false} onClick={addToCartHandler}>Add to Cart</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Dialog
                    open={open}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                  >
                    <DialogTitle>{"Sumbit Review"}</DialogTitle>
                    <DialogContent className='submitDialog'>
                      <Rating precision={0.5} size="large" value={rating} onChange={(e) => setRating(e.target.value)} />
                      <textarea className='textArea' rows="5" cols="100" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                  </Dialog>

                  {
                    product.reviews && product.reviews[0] ? (
                      <>
                        <h3 className='reviews-txt'>REVIEWS</h3>
                        <div className='reviews'>
                          {
                            product.reviews &&
                            product.reviews.map((review) => <ReviewCard key={review} review={review} />)
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
