import axios from 'axios'
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_SUCCESS,
    CLEAR_ERRORS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADD_PRODUCT_FAIL,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_FAIL,
    ALL_REVIEW_SUCCESS,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL
} from '../constants/productConstant'
import { UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from '../constants/userConstant'

//Create Product -- Admin
export const addProduct = (productData) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_PRODUCT_REQUEST
        })

        const config = {
            headers: { "Content-Type": "application/json" }
        }

        const { data } = await axios.post(`https://ecommerce-backend-vemg.onrender.com/api/v1/admin/product/create`, productData, config)

        dispatch({
            type: ADD_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADD_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAllProducts = (keyword = "", currentPage = 1, price = [0, 1000000], category) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        })

        let link = `https://ecommerce-backend-vemg.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

        if (category) {
            link = `https://ecommerce-backend-vemg.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all Products -- Admin
export const getAdminProduct = () => async (dispatch) => {
    try {
        dispatch({
            type: ADMIN_PRODUCT_REQUEST
        })

        const { data } = await axios.get(`https://ecommerce-backend-vemg.onrender.com/api/v1/admin/products`)

        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete Products -- Admin
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })

        const { data } = await axios.delete(`https://ecommerce-backend-vemg.onrender.com/api/v1/admin/product/${id}`)

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateProduct = (id, updatedProductData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.put(`https://ecommerce-backend-vemg.onrender.com/api/v1/admin/product/${id}`, updatedProductData, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`https://ecommerce-backend-vemg.onrender.com/api/v1/product/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//New Review
export const reviewProduct = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_REVIEW_REQUEST })

        const config = {
            headers: { "Content-Type": "application/json" }
        }
        const { data } = await axios.put('https://ecommerce-backend-vemg.onrender.com/api/v1/review', reviewData, config)
        dispatch({
            type: PRODUCT_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get all Reviews -- Admin
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST })

        const { data } = await axios.get(`https://ecommerce-backend-vemg.onrender.com/api/v1/reviews?id=${id}`)
        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete Review of Product -- Admin
export const deleteReviews = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST })

        const { data } = await axios.delete(`https://ecommerce-backend-vemg.onrender.com/api/v1/reviews?id=${reviewId}&productID=${productId}`)
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        })
    }
}


//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}