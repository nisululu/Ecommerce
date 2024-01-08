import React, { useEffect, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getSingleOrderDetail } from '../../actions/orderAction'
import { useAlert } from 'react-alert'
import MetaData from '../layout/MetaData'
import load from '../images/loading.gif'
import './OrderDetails.css'

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
              </div>
            </div>
          </Fragment>
      }
    </Fragment>
  )
}

export default OrderDetails
