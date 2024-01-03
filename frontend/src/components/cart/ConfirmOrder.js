import React, { Fragment } from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './ConfirmOrder.css'
import pom from '../images/slider3.jpg'
const ConfirmOrder = () => {

    const navigate = useNavigate()
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)

    const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const shippingCharges = subTotal > 1000 ? 0 : 200
    const tax = subTotal * .18
    const total = subTotal + shippingCharges + tax
    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.country}`

    const handlePayment = () => {
        const data = { subTotal, shippingCharges, tax, total }
        sessionStorage.setItem("orderInfo", JSON.stringify(data))
        navigate('/process/payment')
    }

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <CheckoutSteps activeStep={1} />

            <div className='confirmOrderPage'>
                <div>
                    <div className='confirmShippingArea'>
                        <h3>Shipping Info</h3>
                        <div className='confirmShippingAreaBox'>
                            <div>
                                <p>Name: </p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone: </p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address: </p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className='confirmCartItems'>
                        <h3>Your Cart Items:</h3>
                        <div className='confirmCartIetmsContainer'>
                            {cartItems && cartItems.map((el) => (
                                <div key={el.product}>
                                    <img src={pom} alt={el.product} />
                                    <Link to={`/product/${el.product}`}>{el.name}</Link> {"  "}
                                    <span>
                                        {el.quantity} X Rs. {el.price} = {" "}
                                        <b>Rs. {el.price * el.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div>
                    <div className='orderSummary'>
                        <h3>Order Summary</h3>
                        <div>
                            <div>
                                <p>Sub Total:</p>
                                <span>Rs. {subTotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>Rs. {shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>Rs. {tax}</span>
                            </div>
                        </div>
                        <div className='orderSummaryTotal'>
                            <p><b>Total:</b></p>
                            <span>Rs. {total}</span>
                        </div>
                        <button onClick={handlePayment}>Proceed to Payment</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder
