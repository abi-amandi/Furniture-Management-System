import axios from "axios";


export const createProduct = async(data) => {
    const response = await axios.post('http://localhost:4000/api/product',data);

    return response;

};