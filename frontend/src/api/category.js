import axios from 'axios';

export const  createCategory = async (formData) => {

    try{

        console.log(`formData: ${JSON.stringify(formData)}`);

        const config = {
            headers: {
                'Content-Type' : 'application/json',
            },
        };
    
        const response = await axios.post('http://localhost:4000/api/category', formData, config);
    
        return response;
    }
    catch(error){
        console.error('Error creating category:', error);
        throw error;
    }
};

export const  getCategories = async () => {

    
        const response = await axios.get('http://localhost:4000/api/category');
             return response;
    
   
};

