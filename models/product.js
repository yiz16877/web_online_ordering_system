const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: Number },
  name: { type: String },
  type: { type: String },
  price: { type: Number },
  Url: { type: String }
});

module.exports = mongoose.model("product", productSchema);
