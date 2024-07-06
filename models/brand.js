const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const brandSchema = new Schema({
  id: Number,
  name: String,
  href: String,
  image: String,
});

const Brand = mongoose.model("Brand", brandSchema);
module.exports = Brand;
