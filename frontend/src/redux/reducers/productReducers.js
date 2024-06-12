import { CREATE_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT, GET_PRODUCT } from "../constants/productConstants";

const INITIAL_STATE = {
    products: [], // Initialize products array
};

const productReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CREATE_PRODUCT:
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case GET_PRODUCTS:
            return {
                ...state,
                products: action.payload, // Update products with fetched data
            };
        case GET_PRODUCT:
            return {
                ...state,
                product: action.payload,
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products.filter(p => p._id !== action.payload._id),
            };
        default:
            return state;
    }
};

export default productReducer;
