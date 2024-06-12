const validateProductRequest = (req) => {
    const { file, body } = req;

    // Destructure required fields from the request body
    const { productName, productDesc, productPrice, productCategory, productQty } = body;

    // Check if all required fields are present
    if (!productName || !productDesc || !productPrice || !productCategory || !productQty) {
        return {
            statusCode: 400,
            errorMessage: 'All fields are required',
        };
    }

    // Check if the request contains either a file or a filename
    if (!file && !body['file']) {
        return {
            statusCode: 400,
            errorMessage: 'Product image is required',
        };
    }

    // Check if productPrice is a non-zero positive number
    if (!Number.isFinite(Number(productPrice)) || Number(productPrice) <= 0) {
        return {
            statusCode: 400,
            errorMessage: 'Product price must be a non-zero positive number',
        };
    }

    // Check if productQty is a non-zero positive number
    if (!Number.isFinite(Number(productQty)) || Number(productQty) <= 0) {
        return {
            statusCode: 400,
            errorMessage: 'Product quantity must be a non-zero positive number',
        };
    }

    return {
        statusCode: 200,
        errorMessage: null,
    };
};

module.exports = { validateProductRequest };