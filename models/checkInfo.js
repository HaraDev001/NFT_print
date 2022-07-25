const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const checkInfoSchema = new Schema({ 
  image_url: {
    type: String,
    required: true
  }, 
  nft_name: {
    type: String,
    required: true
  },
  nft_creator: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  pay: {
    type: String,
    required: true
  }, 
  firstname: {
    type: String,
    required: true
  }, 
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
  },
  state: {
    type: String,
    required: false
  } ,
  country: {
    type: String,
    required: false
  },
  zipcode: {
    type: String,
    required: false
  },
  transactionLink: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = checkInfo = mongoose.model("checkInfos", checkInfoSchema);