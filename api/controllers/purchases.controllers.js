var mongoose = require('mongoose');
var Cart = require('../data/cart.model');
var Order = mongoose.model('Order');
const stripe = require('stripe')('sk_test_dd14u9bpNSzvL3awpktO0JFp00qudlxMUK');

module.exports.createPurchase = async (req, res) => {
    if (!req.session.cart) {
        return res.json({cart: null});
    }
    var cart = new Cart(req.session.cart);
    console.log(cart);
    const stripe = require('stripe')('sk_test_dd14u9bpNSzvL3awpktO0JFp00qudlxMUK');

    var session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            name: 'T-shirt',
            description: 'Comfortable cotton t-shirt',
            images: ['https://example.com/t-shirt.png'],
            amount: cart.totalPrice *100,
            currency: 'usd',
            quantity: 1
        }],
        success_url: 'https://example.com/success',
        cancel_url: 'https://example.com/cancel',
    });
    console.log(session.id);
    res.json({sessionId:session.id});
};