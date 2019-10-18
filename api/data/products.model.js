var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  category : {
    type : String,
    required : true
  },
  img_url : {
    type : String,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  description : {
    type : String,
  },
  bust : {
    type : Number,
  },
  waist : {
    type : Number,
  },
  hip : {
    type : Number,
  }
});

mongoose.model('Product', productSchema);