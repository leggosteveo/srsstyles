var mongoose = require('mongoose');
var Product = require('../data/products.model');
var Cart = require('../data/cart.model');


module.exports.addOne = function(req, res, next) {
    var ProductId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(ProductId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        product.bust = req.body.bust;
        product.waist = req.body.waist;
        product.hip = req.body.hip;
        console.log("add to cart.");
        console.log(product);
        cart.add(product, product.id);
        req.session.cart = cart;
        req.session.save();
        console.log(req.session.cart);
        res.status(200);
    })
    
}

module.exports.getOne = function(req, res) {
    console.log("GET cart");
    if (!req.session.cart) {
        return res.json({products: null});
    } 
     var cart = new Cart(req.session.cart);
     res.json({products: cart.generateArray(), totalPrice: cart.totalPrice, totalQty: cart.totalQty});
}