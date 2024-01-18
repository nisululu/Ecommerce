import React, { useRef } from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'
import './Product.css'

const Product = ({ product }) => {

    const windowWidth = useRef(window.innerWidth)
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.2)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true
    }

    return (
        <Link className='product-card' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div className='react-star-main'>
                <ReactStars {...options} size={windowWidth.current <= 600 ? 10 : 24} /> <span>({product.numOfReviews} Reviews)</span>
            </div>
            <span>Rs.{product.price}</span>
        </Link>
    )
}

export default Product
