import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addProductReducer, productReducer, productDetailsReducer, productsReducer, productReviewReducer, productReviewsReducer, reviewsReducer } from './reducers/productReducer'
import { adminUserReducer, adminUsersReducer, profileReducer, userDetailsReducer, userReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'
import { myOrderReducer, orderDetailsReducer, addOrderReducer, ordersReducer, orderReducer } from './reducers/orderReducer'

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    productReview: productReviewReducer,
    newProduct: addProductReducer,
    product: productReducer,
    user: userReducer,
    allUsers: adminUsersReducer,
    userDetails: userDetailsReducer,
    adminUser: adminUserReducer,
    profile: profileReducer,
    cart: cartReducer,
    addOrder: addOrderReducer,
    myOrders: myOrderReducer,
    orderDetails: orderDetailsReducer,
    orders: ordersReducer,
    order: orderReducer,
    productReviews: productReviewsReducer,
    review: reviewsReducer,
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;