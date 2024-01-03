import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../constants/cartConstant";

export const cartReducer = (state = { cartItems: [], shippingInfo: {}}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload
            console.log(item);

            const isItemExist = state.cartItems.find(
                (el) => el.product === item.product
            ) //checking if the item exists or not before 

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((el) =>
                        el.product === isItemExist.product ? item : el)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((el) => el.product !== action.payload)
            }
        
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload
            }

        default:
            return state
    }
}