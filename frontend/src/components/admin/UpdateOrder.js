import React, { Fragment, useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import pom from '../images/slider3.jpg'
import load from '../images/loading.gif'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { clearErrors, getSingleOrderDetail, updateOrder } from '../../actions/orderAction'
import './UpdateOrder.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'
import { UPDATE_ORDER_RESET } from '../../constants/orderConstant'

const UpdateOrder = () => {

    const dispatch = useDispatch()
    const alert = useAlert()
    const { id } = useParams()
    const navigate = useNavigate()

    const [status, setStatus] = useState("")
    const { user } = useSelector((state) => state.user)
    const { loading, error, order } = useSelector(state => state.orderDetails)
    const { error: updateOrderError, isUpdated } = useSelector(state => state.order)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateOrderError) {
            alert.error(updateOrderError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success("Order Updated Successfully!")
            navigate("/admin/orders")
            dispatch({ type: UPDATE_ORDER_RESET })
        }

        dispatch(getSingleOrderDetail(id))
    }, [dispatch, id, error, alert, updateOrderError, isUpdated, navigate])

    const handleOrderProcess = (e) => {
        e.preventDefault()

        const myForm = new FormData()
        myForm.set("status", status)

        dispatch(updateOrder(id, myForm))
    }

    return (
        <Fragment>
            <MetaData title="Confirm Order" />
            <div className='dashboard'>
                <Sidebar />
                {
                    loading ?
                        // <Loader />
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                            <img src={load} alt='loading' />
                        </div> : (
                            <div className='OrderPage'>
                                <div>
                                    <div className='confirmShippingArea'>
                                        <h3>Shipping Info</h3>
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

                                        <h3>Payment Info</h3>
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

                                        <h3>Order Info</h3>
                                        <div className='orderDetailsContainerBox'>
                                            <div>
                                                <p>Order Status:</p>
                                                <span className={order.orderStatus && order.orderStatus === "Processing" ? "redColor" : "greenColor"}>{order.orderStatus && order.orderStatus}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='confirmCartItems'>
                                        <h3>Your Cart Items:</h3>
                                        <div className='confirmCartIetmsContainer'>
                                            {order.orderItems && order.orderItems.map((el) => (
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
                                    <form
                                        className='updateOrderForm'
                                        encType='multipart/form-data'
                                        onSubmit={handleOrderProcess}
                                    >
                                        <h3>Process Order</h3>
                                        <div>
                                            <FontAwesomeIcon className="updateProductIcon" icon={faList} />
                                            <select onChange={(e) => setStatus(e.target.value)}
                                                value={status}
                                            >
                                                <option value="">Choose category</option>
                                                {
                                                    order && order.orderStatus === "Processing" && (
                                                        <option value="Shipped">Shipped</option>
                                                    )
                                                }
                                                {
                                                    order && order.orderStatus === "Shipped" && (
                                                        <option value="Delivered">Delivered</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <input
                                            type='submit'
                                            value="Update Product"
                                            className='addOrderBtn'
                                            disabled={loading ? true : false || status === "" ? true : false}
                                        />
                                    </form>
                                </div>
                            </div>
                        )
                }
            </div>
        </Fragment>
    )
}

export default UpdateOrder
