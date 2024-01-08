import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './Success.css'

const Success = () => {
  return (
    <div className='orderSuccess'>
    <FontAwesomeIcon className='orderCheck' icon={faCircleCheck} />
    <h3>Your order has been placed successfully. Thank You!</h3>
    <Link to='/orders/me'>View Order</Link>
    </div>
  )
}

export default Success
