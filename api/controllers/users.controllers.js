var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.GetAll = function(req, res) {
  console.log('Requested by: ' + req.user);
  console.log('GET the users');
  console.log(req.query);

  User
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, users) {
      console.log(err);
      console.log(users);
      if (err) {
        console.log("Error finding products");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found users", users.length);
        res
          .json(users);
      }
    });

};

module.exports.GetOne = function(req, res) {
  var id = req.params.userId;

  console.log('GET userId', id);

  User
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding user");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("UserId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "User ID not found " + id
        };
      } 
      res
        .status(response.status)
        .json(response.message);
    });

};

module.exports.AddOne = function(req, res) {
  console.log("POST new genre");

  User
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
    }, function(err, user) {
      if (err) {
        console.log("Error creating user");
        res
          .status(400)
          .json(err);
      } else {
        console.log("User created!", user);
        res
          .status(201)
          .json(user);
      }
    });

};


module.exports.usersUpdateOne = function(req, res) {
  var userlId = req.params.userId;

  console.log('GET userId', userId);

  User
    .findById(userId)
    .select('-reviews -rooms')
    .exec(function(err, user) {
      if (err) {
        console.log("Error finding user");
        res
          .status(500)
          .json(err);
          return;
      } else if(!user) {
        console.log("UserId not found in database", userId);
        res
          .status(404)
          .json({
            "message" : "User ID not found " + userId
          });
          return;
      }

      user.name = req.body.name;
      user.description = req.body.description;
      user.stars = parseInt(req.body.stars,10);
      user.services = _splitArray(req.body.services);
      user.photos = _splitArray(req.body.photos);
      user.currency = req.body.currency;
      user.location = {
        address : req.body.address,
        coordinates : [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      };

      user
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