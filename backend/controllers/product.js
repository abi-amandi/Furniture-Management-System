const Product = require("../models/Product");
const { validateProductRequest } = require("../helpers/product-utils");
//import file system
const fs = require('fs');


exports.create = async (req, res) => {
    
        console.log('req.body: ', req.body);
        console.log('req.file: ', req.file);

        // Validate the request
        const validationResult = validateProductRequest(req);

        // If validation fails, return the appropriate error response
        if (validationResult.errorMessage) {
            return res.status(validationResult.statusCode).json({
                errorMessage: validationResult.errorMessage,
            });
        }

        // Destructure fields from the request object
        const {filename} = req.file || req.body['file'];
        const {productName, productDesc, productPrice, productCategory, productQty } =req.body;
        

        try{
            // Create a new product object
            let product = new Product();
            product.fileName = filename || req.body['file'];
            product.productName = productName;
            product.productDesc = productDesc;
            product.productPrice = productPrice;
            product.productCategory = productCategory;
            product.productQty = productQty;
            console.log(`Product to be saved: ${JSON.stringify(product)}`);

            // Save the product to the database
            await product.save();

            // Return success response
            res.json({
                successMessage: `${productName} was created`,
                product,
            });

        }catch (err) {
            // If an error occurs, return a 500 internal server error response
            console.log(err, 'productController.create error');
            res.status(500).json({
                errorMessage: 'Please try again later',
            });
        }
};

exports.readAll = async (req, res) => {
    
    try{

        const products = await Product.find({}).populate('productCategory', 'category');

        res.json({products});

    }catch (err) {
        console.log(err, 'productController.readAll error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        });
    }
};


exports.read = async (req, res) => {
    
    try{

        const productId = req.params.productId;;
        const product = await Product.findById(productId);
        
        res.json(product);

    }catch (err) {
        console.log(err, 'productController.read error');
        res.status(500).json({
            errorMessage: 'Please try again later'
        });
    }
};

exports.update= async (req, res) => {
    
    const productId = req.params.productId;

    if (req.file !== undefined) {
		req.body.fileName = req.file.filename;
	}

    try{

    const oldProduct = await Product.findByIdAndUpdate(productId, req.body);

    if (!oldProduct) {
        return res.status(404).json({ errorMessage: 'Product not found' });
    }


    if (req.file !== undefined && req.file.filename !== oldProduct.fileName) {
		fs.unlink(`uploads/${oldProduct.fileName}`, err => {
			if(err) {
                console.error(`Error: ${err}`);
            }
			console.log('Image deleted from the filesystem');
		});
	}
    

    res.json({
        successMessage: 'Product successfully updated',
    });

   }catch (err) {
    console.log(err, "productController.update error");
    res.status(500).json({
        errorMessage: "Please try again later",
    });
   }

};

exports.delete = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(`Deleting by product ID: ${productId}`);
        const deletedProduct = await Product.findByIdAndDelete(productId);
        console.log(`Deleted product: ${JSON.stringify(deletedProduct)}`);

        if (!deletedProduct) {
            return res.status(404).json({ errorMessage: 'Product not found' });
        }

        // Assuming 'uploads' directory is in the root directory
        const filePath = `uploads/${deletedProduct.fileName}`;

        // Check if file exists before trying to delete it
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
                console.error('Error accessing file:', err);
                return res.status(500).json({ errorMessage: 'Error accessing file' });
            }

            // File exists, proceed to delete
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting file:', unlinkErr);
                    return res.status(500).json({ errorMessage: 'Error deleting file' });
                }

                console.log('Image successfully deleted from filesystem:', deletedProduct.fileName);
                res.json(deletedProduct);
            });
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ errorMessage: 'Please try again later' });
    }
};

