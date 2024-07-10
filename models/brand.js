import mongoose, { Schema, models } from "mongoose";

const brandSchema = new Schema({
  name: String,
  href: String,
  image: String,
});

const Brand = models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;
