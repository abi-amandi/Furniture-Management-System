import axios from "axios";
import { START_LOADING, STOP_LOADING } from "../constants/loadingConstants";
import { SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "../constants/messageConstants";
import { CREATE_PRODUCT, GET_PRODUCTS, DELETE_PRODUCT,  GET_PRODUCT } from "../constants/productConstants";


export const createProduct = formData => async dispatch => {
    try{
        dispatch({ type: START_LOADING});
        const response = await axios.post('http://localhost:4000/api/product',formData);
        dispatch({ type: STOP_LOADING});
        dispatch({ type: SHOW_SUCCESS_MESSAGE, payload: response.data.successMessage });
        dispatch({
            type: CREATE_PRODUCT,
            payload: response.data.product,
        });
        

    }catch(err){

        console.log('createProduct api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }
};

export const getProducts = () => async dispatch => {
    try{
        dispatch({ type: START_LOADING});
        const response = await axios.get('http://localhost:4000/api/product');
        dispatch({ type: STOP_LOADING});
        dispatch({ type: GET_PRODUCTS, payload: response.data.products, });
        

    }catch(err){

        console.log('getProduct api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }
};



export const getProduct = productId => async dispatch => {
    try{
        dispatch({ type: START_LOADING});
        const response = await axios.get(`http://localhost:4000/api/product/${productId}`);
        dispatch({ type: STOP_LOADING});
        dispatch({ type: GET_PRODUCT, payload: response.data, });
        

    }catch(err){

        console.log('getProduct api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }
};

export const deleteProduct = productId => async dispatch => {
    try{
        dispatch({ type: START_LOADING});
        const response = await axios.delete(`http://localhost:4000/api/product/${productId}`);
        dispatch({ type: STOP_LOADING});
        dispatch({ type: DELETE_PRODUCT, payload: response.data, });
        

    }catch(err){

        console.log('deleteProduct api error: ', err);
        dispatch({ type: STOP_LOADING });
        dispatch({ type: SHOW_ERROR_MESSAGE, payload: err.response.data.errorMessage });
    }
};

export const fetchProducts = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:4000/api/product');
        console.log(response.data); // Check the structure of response.data
        dispatch({ type: GET_PRODUCTS, payload: response.data.products });
        return response.data.products; // Return data for handling in the component
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error; // Rethrow the error for handling in the component
    }
};