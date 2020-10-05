const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarketItemSchema = new Schema({
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
    required: true
  },
  stock: {
    type: Number,
    required:true
  },
  status: {
    type: String, //"Sale" "NotSale"
    required:true
  },
});

module.exports = MarketItem = mongoose.model("myMarketItem", MarketItemSchema);
