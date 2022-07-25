const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});
module.exports = user = mongoose.model("users", userSchema);