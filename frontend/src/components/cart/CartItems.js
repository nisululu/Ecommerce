import React from 'react'
import './CartItems.css'
import { Link } from 'react-router-dom'
import { removeItemsFromCart } from '../../actions/cartAction'
import { useDispatch } from 'react-redux'

const CartItems = ({item}) => {
  const dispatch = useDispatch()
  const deleteItem = (id) => {
    dispatch(removeItemsFromCart(id))
  }
  return (
    <div className='cartItemCard'>
      <img src={item.image} alt={item.name}/>
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: Rs. ${item.price}`}</span>
        <p onClick={()=>deleteItem(item.product)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItems
