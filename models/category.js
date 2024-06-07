import mongoose, { Schema, models } from "mongoose";

const submenuSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  newTab: {
    type: Boolean,
    required: true,
  },
});

const categorySchema = new Schema({
  // id: {
  //   type: String,
  //   required: true,
  // },
  title: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  newTab: {
    type: Boolean,
    required: true,
  },
  submenu: {
    type: [submenuSchema],
    required: false,
  },
});

const Category = models.Category || mongoose.model("Category", categorySchema);

export default Category;
