const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {type: Number},
    name: {type: String},
    brand: {type: String},
    price: {type: Number},
    color: {type: String},
    shoeUrl: {type: String},
  }
);

module.exports = mongoose.model('product', productSchema);