const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const Product = require('../models/Product');

describe('Product API', () => {
    let productId;

    // Test case: Adding a new product
    it('should add a new product', async () => {
        const newProduct = {
            productName: 'L Grand Sofa',
            productDesc: 'Description of the test product',
            productPrice: 135000,
            productCategory: '66065a7875a03675d1c9f683',
            productQty: 10,
            file: "a.jpg"
        };

        // Make POST request to add a new product
        const response = await request(app)
            .post('/api/product')
            .send(newProduct);

        // Expect status code 200 for successful product creation
        expect(response.status).toBe(200);

        // Check if response body contains the success message and a product object
        expect(response.body.successMessage).toBeTruthy();
        expect(response.body.product).toBeTruthy();

        // Store the created product's ID for further tests
        productId = response.body.product._id;
    }, 10000);

    // Test case: Retrieving all product details
    it('should return all product details', async () => {
        // Send GET request to retrieve all product details
        const response = await request(app).get('/api/product');

        // Check response status code
        expect(response.status).toBe(200);

        // Check response body
        expect(response.body).toBeDefined();
        expect(Array.isArray(response.body.products)).toBe(true);

        const products = response.body.products;

        // Ensure each product has required properties
        products.forEach(product => {
            expect(product).toHaveProperty('productName');
            expect(product).toHaveProperty('productDesc');
            expect(product).toHaveProperty('productPrice');
            expect(product).toHaveProperty('productCategory');
            expect(product).toHaveProperty('productQty');
        });
    });

    // Test case: Editing a product
    it('should edit a product successfully', async () => {
        const updatedProductData = {
            productName: 'Updated Product Name',
            productDesc: 'Updated product description',
            productPrice: 200000,
            productQty: 5
        };

        // Send a PUT request to update the product
        const response = await request(app)
            .put(`/api/product/${productId}`)
            .send(updatedProductData);

        // Check if the response is successful
        expect(response.status).toBe(200);
        expect(response.body.successMessage).toEqual('Product successfully updated');

        // Check if the product details are updated in the database
        const updatedProduct = await Product.findById(productId);
        expect(updatedProduct.productName).toEqual(updatedProductData.productName);
        expect(updatedProduct.productDesc).toEqual(updatedProductData.productDesc);
        expect(updatedProduct.productPrice).toEqual(updatedProductData.productPrice);
        expect(updatedProduct.productQty).toEqual(updatedProductData.productQty);
    });

    // Test case: Editing a non-existent product
    it('should return 404 if product to be edited does not exist', async () => {
        const nonExistentProductId = new mongoose.Types.ObjectId();

        // Send a PUT request to update a non-existent product
        const response = await request(app)
            .put(`/api/product/${nonExistentProductId}`)
            .send({});

        // Check if the response status is 404
        expect(response.status).toBe(404);
        expect(response.body.errorMessage).toEqual('Product not found');
    });

    // Teardown: Clean up by deleting the mock product created for testing
    afterAll(async () => {
        if (productId) {
            await Product.findByIdAndDelete(productId);
        }
    });

     // Test case: Deleting a product
     it('should delete a product successfully', async () => {
        const fs = require("fs");
        const createStream = fs.createWriteStream("./uploads/a.jpg");
        createStream.end();

        // Send a DELETE request to delete the product
        const response = await request(app)
            .delete(`/api/product/${productId}`);

        // Check if the response is successful
        expect(response.status).toBe(200);
        expect(response.body._id).toEqual(productId);

        // Check if the product is deleted from the database
        const deletedProduct = await Product.findById(productId);
        expect(deletedProduct).toBeNull();
    });


    // Test case: Validation Error for Missing Fields
    it('should return validation error if required fields are missing', async () => {
        // Send POST request without required fields
        const response = await request(app)
            .post('/api/product')
            .send({});

        // Expect status code 400 for validation error
        expect(response.status).toBe(400);

        // Expect response body to contain validation error message
        expect(response.body.errorMessage).toEqual('All fields are required');
    });

    // Test case: Validation Error for Invalid Product Price
    it('should return validation error if product price is invalid', async () => {
        // Send POST request with invalid product price (non-numeric)
        const response = await request(app)
            .post('/api/product')
            .send({
                productName: 'Test Product',
                productPrice: 'invalid_price',
                productCategory: '66065a7875a03675d1c9f683',
                productDesc: 'Description of the test product',
                productQty: 10,
                file: 'test.jpg'
            });

        // Expect status code 400 for validation error
        expect(response.status).toBe(400);

        // Expect response body to contain validation error message for product price
        expect(response.body.errorMessage).toEqual('Product price must be a non-zero positive number');
    });
});
