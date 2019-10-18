var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');
var ctrlCart = require('../controllers/cart.controllers.js');

// Products routes
router
  .route('/products')
  .get(ctrlProducts.productsGetAll)
  .post(ctrlProducts.productsAddOne);

router
  .route('/products/:productId')
  .get(ctrlProducts.productsGetOne)
  .put(ctrlProducts.productsUpdateOne);

// Cart routes
router
  .route('/cart')
  .get(ctrlCart.getCart)
router
  .route('/cart/:id')
  .post(ctrlCart.cartAddOne);

module.exports = router;