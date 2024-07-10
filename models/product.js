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
    sale: {
      type: Boolean,
      required: false,
    },
    salePrice: {
      type: Number,
      required: false,
    },
    brand: {
      type: String,
      require: false,
    },
  },
  { timestamps: true }
);

productSchema.index({ name: "text", description: "text" });
const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
