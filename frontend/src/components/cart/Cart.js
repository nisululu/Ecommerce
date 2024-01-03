import React, { Fragment } from 'react'
import './Cart.css'
import CartItems from './CartItems'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart } from '../../actions/cartAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate() 
  const { cartItems } = useSelector((state) => state.cart)


  const handleInc = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }

  const handleDec = (id, quantity) => {
    const newQty = quantity - 1
    if (quantity <= 1) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }
  
  const handleCheckout = () => {
    navigate('/login?redirect=shipping')
  }
  
  return (
    <Fragment>
      {
        cartItems.length === 0 ? (
          <div className='emptyCart'>
            <FontAwesomeIcon className='emptyCartImg' icon={faCartShopping} />
            <h1>No Product in Your Cart</h1>
            <Link to='/products'>View Product</Link>
          </div>
        ) : (
          <Fragment>
          <div className='cartPage'>
            <div className='cartHeader'>
              <p>Product</p>
              <p>Quantity</p>
              <p>SubTotal</p>
            </div>

            {
              cartItems && cartItems.map((item) => (
                <div className='cartContainer' key={item.product}>
                  <CartItems item={item} />
                  <div className='cartInput'>
                    <button onClick={() => handleDec(item.product, item.quantity)}>-</button>
                    <input type='number' value={item.quantity} readOnly />
                    <button onClick={() => handleInc(item.product, item.quantity, item.stock)}>+</button>
                  </div>
                  <div className='cartSubTotal'>
                    {`Rs. ${item.price * item.quantity}`}
                  </div>
                </div>
              ))
            }

            <div className='cartGrossTotal'>
              <div></div>
              <div className='cartGrossTotalBox'>
                <p>Gross Total</p>
                <p>{`${cartItems.reduce((acc, item) => acc+ item.price * item.quantity, 0)}`}</p>
              </div>
              <div></div>
              <div className='checkOutBtn'>
                <button onClick={handleCheckout}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
        )

      }
    </Fragment>
  )
}

export default Cart
