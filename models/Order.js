const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "myAccount"
  },
  name: {
    type: String,
    required: true
  },
  colour: {
    type: String,
    required:true
  },
  size: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required:true
  },
  description: {
    type: String
  },///////////////////

  price: {
    type: Number,
    required:true
  },
  quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required:true //pending, accepted, delivered
  }
});

module.exports = Order = mongoose.model("myOrder", OrderSchema);
