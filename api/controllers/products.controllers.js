var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports.productsGetAll = function(req, res) {
  console.log('Requested by: ' + req.user);
  console.log('GET the genres');
  console.log(req.query);

  var offset = 0;
  var count = 5;
  var maxCount = 50;

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  Product
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, products) {
      console.log(err);
      console.log(products);
      if (err) {
        console.log("Error finding products");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found products", products.length);
        res
          .json(products);
      }
    });

};

module.exports.productsGetOne = function(req, res) {
  var id = req.params.productId;

  console.log('GET productId', id);

  Product
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding product");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("ProductId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Product ID not found " + id
        };
      } 
      res
        .status(response.status)
        .json(response.message);
    });

};

module.exports.productsAddOne = function(req, res) {
  console.log("POST new genre");

  Product
    .create({
      name : req.body.name,
      description : req.body.description,
      stars : parseInt(req.body.stars,10),
      services : _splitArray(req.body.services),
      photos : _splitArray(req.body.photos),
      currency : req.body.currency,
      location : {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    }, function(err, product) {
      if (err) {
        console.log("Error creating product");
        res
          .status(400)
          .json(err);
      } else {
        console.log("Product created!", product);
        res
          .status(201)
          .json(product);
      }
    });

};


module.exports.productsUpdateOne = function(req, res) {
  var productlId = req.params.productId;

  console.log('GET productId', productId);

  Product
    .findById(productId)
    .select('-reviews -rooms')
    .exec(function(err, product) {
      if (err) {
        console.log("Error finding product");
        res
          .status(500)
          .json(err);
          return;
      } else if(!product) {
        console.log("ProductId not found in database", productId);
        res
          .status(404)
          .json({
            "message" : "Product ID not found " + productId
          });
          return;
      }

      product.name = req.body.name;
      product.description = req.body.description;
      product.stars = parseInt(req.body.stars,10);
      product.services = _splitArray(req.body.services);
      product.photos = _splitArray(req.body.photos);
      product.currency = req.body.currency;
      product.location = {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      product
        .save(function(err, productUpdated) {
          if(err) {
            res
              .status(500)
              .json(err);
          } else {
            res
              .status(204)
              .json();
          }
        });


    });

};