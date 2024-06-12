import React, { useEffect, useState } from "react";
import { getProducts } from "../redux/actions/productActions";
import { getCategories } from "../redux/actions/categoryActions";
import { GET_PRODUCTS } from "../redux/constants/productConstants";
import axios from "axios";
import Card from './Card';
// redux
import {  useDispatch, useSelector } from "react-redux";

const AdminBody = () => {
    
    const [text, setText] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const { products } = useSelector(state => state.products);
    const { categories } = useSelector(state => state.categories);

    const handleSearch = async e => {
        resetState();
        e.preventDefault(); // Prevent default form submission
        setText(e.target.value);
    
        try {
            const response = await axios.post('http://localhost:4000/api/filter/search', { type: 'text', query: e.target.value });
            dispatch({ type: GET_PRODUCTS, payload: response.data.products });
        } catch (err) {
            console.log('getProductsByFilter api error: ', err);
            
            
        }
    };

    const handleCategory = async e => {

        resetState();
        
        const currentCategoryChecked = e.target.value;
        const allCategoriesChecked = [...categoryIds];
        const indexFound = allCategoriesChecked.indexOf(currentCategoryChecked);
    
        let updatedCategoryIds;
        if (indexFound === -1){
            // Add
            updatedCategoryIds = [...categoryIds, currentCategoryChecked];
        } else {
            // Remove
            updatedCategoryIds = [...categoryIds];
            updatedCategoryIds.splice(indexFound, 1);
        }
    
        try {
            // Make API call to filter products by category
            const response = await axios.post('http://localhost:4000/api/filter/search', { type: 'category', query: updatedCategoryIds });
            dispatch({ type: GET_PRODUCTS, payload: response.data.products });
            setCategoryIds(updatedCategoryIds); // Update local state with new category IDs
        } catch (err) {
            console.log('Error filtering products by category: ', err);
        }
    };

    const resetState = () => {
        setText('');
        setCategoryIds([]);
    };

    return (


        <div className='row'>
                <div className='col-md-3 border-end'>
                    <div className='text-muted mb-3'>
                        Filters <span className='fas fa-sliders-h'></span>
                    </div>

                    <nav className='navbar navbar-expand-lg navbar-light bg-light border-top p-3'>
                        <form className='d-flex my-2 my-lg-0'>
                            <input className='form-control  me-5' type='search' placeholder='Search' aria-label='Search' name='search' value={text}
                            onChange={handleSearch} />
                            <button className='btn btn-outline-success' type='submit' disabled={true} > Search </button>
                        </form>
                    </nav>

                    <div className='border-top border-bottom bg-light p-3'>
                        {categories && categories.map(c => (
                            <div key={c._id} className='form-check'>
                                <input className='form-check-input' type='checkbox' name='category' value={c._id} id='flexCheckChecked' checked={categoryIds.includes(c._id)} onChange={handleCategory} />
                                <label className='form-check-label' htmlFor='flexCheckChecked'>
                                    {c.category}
                                </label>
                            </div>
                        ))}
                    </div>

                </div>

               <div className='col-md-9'>
                    {products && products.length > 0 && (
                        <div className='row row-cols-1 row-cols-md-3 g-4'>
                            {products && products.map(product => (
                                <div key={product._id} className='col mb-4'>
                                    <Card product={product} adminPage={true} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>


        </div>  
    );
};

export default AdminBody;
