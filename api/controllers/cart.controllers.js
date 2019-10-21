var mongoose = require('mongoose');
var Cart = require('../data/cart.model');
var Product = mongoose.model('Product');

module.exports.addOne = function(req, res) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log("add to cart.");
    Product.findById(productId, function(err, product) {
       if (err) {
           return res.json({message: 'No items'});
       }
        cart.add(product, product._id);
        req.session.cart = cart;
        console.log(req.session.cart);
    });
}

module.exports.getOne = function(req, res) {
    console.log("GET cart");
    if (!req.session.cart) {
        return res.json({products: null});
    } 
     var cart = new Cart(req.session.cart);
     res.json({products: cart.generateArray(), totalPrice: cart.totalPrice});
}