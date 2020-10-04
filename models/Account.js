const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  username: { //phone number for customer
    type: String,
    required: true
  },
  password: { //OTP for customer
    type: String,
    required: true
  },
  access: { //'Admin' 'Customer' 'SalesAgent'
    type: String,
    required: true
  }
});

module.exports = Account = mongoose.model("myAccount", AccountSchema);
