var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email : {
    type : String,
    required : true
  },
  password : {
    type : String,
    required : true
  },
  first_name : {
    type : String,
    required : true
  },
  last_name : {
    type : Number,
    required : true
  }
});

mongoose.model('User', userSchema);