import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import './Product.css'

const Product = ({ product }) => {

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.2)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size:20
    }

    return (
        <Link className='product-card' to={`/product/${product._id}`}>
            <img src="https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGFwdG9wJTIwY29tcHV0ZXJ8ZW58MHx8MHx8fDA=&w=1000&q=80" alt={product.name} />
            <p>{product.name}</p>
            <div className='react-star-main'>
                <ReactStars {...options} /> <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>Rs.{product.price}</span>
        </Link>
    )
}

export default Product
