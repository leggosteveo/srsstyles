var express = require('express');
var router = express.Router();

var ctrlProducts = require('../controllers/products.controllers.js');
var ctrlUsers = require('../controllers/users.controllers.js');
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

// User routes
router
  .route('/users')
  .get(ctrlUsers.GetAll)
  .post(ctrlUsers.AddOne);

router
  .route('/users/:userId')
  .get(ctrlUsers.GetOne);

// Cart routes
router
  .route('/cart')
  .get(ctrlCart.getOne);

router
  .route('/cart/add-to-cart/:Id')
  .post(ctrlCart.addOne);

module.exports = router;