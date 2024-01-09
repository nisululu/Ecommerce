import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { clearErrors, getSingleOrderDetail } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import load from '../images/loading.gif'
import './OrderDetails.css'
import Image from '../images/slider4.jpg'

const OrderDetails = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const { id } = useParams()

  const { loading, error, order } = useSelector(state => state.orderDetails)

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getSingleOrderDetail(id))
  }, [dispatch])

  return (
    <Fragment>
      {
        loading ?
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <img src={load} alt='loading' />
          </div> :
          <Fragment>
            <MetaData title="Order Details" />
            <div className='orderDetailsPage'>
              <div className='orderDetailsContainer'>
                <h3>ORDER # {order._id}</h3>
                <h4>Shipping Info</h4>
                <div className='orderDetailsContainerBox'>
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>{order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}</span>
                  </div>
                </div>

                <h4>Payment Info</h4>
                <div className='orderDetailsContainerBox'>
                  <div>
                    <p>Transaction:</p>
                    <span className={order.paymentInfo && order.paymentInfo.status === "succeeded" ? "greenColor" : "redColor"}>{order.paymentInfo && order.paymentInfo.status === "succeeded" ? "PAID" : "NOT PAID"}</span>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order.totalPrice && order.totalPrice}</span>
                  </div>
                </div>

                <h4>Order Info</h4>
                <div className='orderDetailsContainerBox'>
                  <div>
                    <p>Order Status:</p>
                    <span className={order.orderStatus && order.orderStatus === "Processing" ? "redColor" : "greenColor"}>{order.orderStatus && order.orderStatus === "Processing" ? "Processing" : "Delivered"}</span>
                  </div>
                </div>
              </div>

              <div className='orderDetailsCartItems'>
                <h4>Order Items</h4>
                <div className='orderDetailsCartItemsContainer'>
                  {
                    order.orderItems && order.orderItems.map((el) => {
                      return (
                        <div key={el.product}>
                          <img src={Image} alt="Image" />
                          <Link to={`/product/${el.product}`}>{el.name}</Link> {" "}
                          <span>
                            {el.quantity} X Rs. {el.price} = {" "}
                            <b>Rs. {el.price * el.quantity}</b>
                          </span>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default OrderDetails
