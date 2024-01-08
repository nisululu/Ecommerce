import React, { Fragment, useEffect, useRef } from 'react'
import CheckoutSteps from './CheckoutSteps'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js'
import axios from 'axios'
import './Payment.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faCalendarCheck, faTowerBroadcast } from '@fortawesome/free-solid-svg-icons'
import MetaData from '../layout/MetaData'
import { useNavigate } from 'react-router-dom'
import { clearErrors, createOrder } from '../../actions/orderAction'

const Payment = () => {
    const alert = useAlert()
    const dispatch = useDispatch()
    const payBtn = useRef(null)
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const { shippingInfo, cartItems } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.user)
    const { error } = useSelector((state) => state.order)

    const paymentData = {
        amount: Math.round(orderInfo.total * 100) //receives in paise
    }

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subTotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.total
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        payBtn.current.disabled = true

        try {
            const config = {
                headers: { "Content-Type": "application/json" }
            }
            const { data } = await axios.post("/api/v1/process/payment", paymentData, config)
            const client_secret = data.client_secret

            if (!stripe || !elements) return

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        }
                    }
                }
            })

            if (result.error) {
                payBtn.current.disabled = false
                alert.error(result.error.message)
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    }
                    dispatch(createOrder(order))
                    navigate('/success')
                } else {
                    alert.error("There's some issue while processing payment!")
                }
            }

        } catch (error) {
            payBtn.current.disabled = false
            alert.error(error.response.data.message)
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error, alert])

    return (
        <Fragment>
            <MetaData title="Payment Process" />
            <CheckoutSteps activeStep={2} />

            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={(e) => handleSubmit(e)}>
                    <h3>Card Info</h3>
                    <div>
                        <FontAwesomeIcon className='fonticon' icon={faCreditCard} />
                        <CardNumberElement className='paymentInput' />
                    </div>

                    <div>
                        <FontAwesomeIcon className='fonticon' icon={faCalendarCheck} />
                        <CardExpiryElement className='paymentInput' />
                    </div>

                    <div>
                        <FontAwesomeIcon className='fonticon' icon={faTowerBroadcast} />
                        <CardCvcElement className='paymentInput' />
                    </div>

                    <input
                        type='submit'
                        value={`Pay - Rs. ${orderInfo && orderInfo.total}`}
                        className='paymentBtn'
                        ref={payBtn}
                    />
                </form>
            </div>
        </Fragment>
    )
}

export default Payment
