import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    characteristics: {
      type: String,
      required: false,
    },
    image: {
      type: Array,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
