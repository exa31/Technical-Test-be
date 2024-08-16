const productsController = require('./controller');
const express = require('express');
const router = express.Router();

router.get('/addproducts', productsController.addProducts);

router.post('/products', productsController.createProduct);

router.get('/products', productsController.getProducts);

router.get('/products/:id', productsController.getProduct);

router.put('/products/:id', productsController.updateProduct);

router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;
