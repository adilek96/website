import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import Product from "@/models/product";
import User from "@/models/user";

//categories

export async function fetchCategories() {
  await connectMongoDB();
  try {
    const data = await Category.find({});
    const pdata = JSON.parse(JSON.stringify(data));
    return { pdata };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
}

//products

export async function fetchProducts() {
  await connectMongoDB();
  try {
    const data = await Product.find({});
    const products = JSON.parse(JSON.stringify(data));
    return { products };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products!");
  }
}

export async function fetchUsers() {
  await connectMongoDB();
  try {
    const data = await User.find({});
    const users = JSON.parse(JSON.stringify(data));
    return { users };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
}
