import React, { useState, Fragment } from "react";
import isEmpty from 'validator/lib/isEmpty';
//import { createCategory} from '../api/category';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { showLoading } from '../helpers/loading';
//redux
import { useDispatch, useSelector } from "react-redux";
import {clearMessages} from '../redux/actions/messageActions';
import {createCategory} from '../redux/actions/categoryActions';

const AdminCategoryModal = () => {

     /********************************
     * REDUX GLOBAL STATE PROPERTIES
     ********************************/
    const {successMsg, errorMsg} = useSelector(state => state.messages);
    const {loading} = useSelector(state => state.loading);

    const dispatch = useDispatch();

      /********************************
     * COMPONENT STATE PROPERTIES
     ********************************/

    const [category, setCategory] = useState('');
    const [clientSideErrorMsg, setClientSideErrorMsg] = useState('');

     /********************************
     * EVENT HANDLERS
     ********************************/


    const handleMessages = (evt) => {
        dispatch(clearMessages());
    };

    const handleCategoryChange = (evt) => {
        dispatch(clearMessages());
        setCategory(evt.target.value);
    };



    const handleCategorySubmit = (evt) => {

        evt.preventDefault();
        try {

            if (isEmpty(category)) {
                setClientSideErrorMsg('Please enter a category');
            } else {
                const data = { category };
                dispatch(createCategory(data));
                setCategory('');
            }

        }
        catch (error) {
            console.error('Error in handleCategorySubmit:', error);

        }

    };

     /********************************
     * RENDERER
     ********************************/

    return (

    <div id='addCategoryModal' className='modal' onClick={handleMessages}>
        <div className='modal-dialog modal-dialog-centered modal-lg'>
            <div className='modal-content'>
                <form onSubmit={handleCategorySubmit}>
                    <div className='modal-header bg-primary text-white d-flex justify-content-between align-items-center'>
                        <h5 className='modal-title'>Add Category</h5>
                        <button type='button' className='btn-close' data-bs-dismiss='modal' aria-label='Close'></button>
                    </div>

                    <div className='modal-body my-2'>

                        {clientSideErrorMsg && showErrorMsg(clientSideErrorMsg)}
                        {errorMsg && showErrorMsg(errorMsg)}
                        {successMsg && showSuccessMsg(successMsg)}

                        {
                            loading ? (
                                <div className='text-center'>
                                    {showLoading()}
                                </div>
                            ) : (
                                <Fragment>
                                    <label className='text-secondry mb-2'>Category</label>
                                    <input type='text' className='form-control' name='category' value={category} onChange={handleCategoryChange} />

                                </Fragment>
                            )
                        }


                    </div>
                    <div className='modal-footer'>
                        <button className='btn btn-secondary' data-bs-dismiss='modal'>Close</button>
                        <button className='btn btn-primary text-white' type='submit'>Submit</button>
                    </div>
                </form>
            </div>


        </div>
    </div>
    );
};

export default AdminCategoryModal;