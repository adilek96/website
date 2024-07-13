import { connectMongoDB } from "@/lib/mongodb";
import Brand from "@/models/brand";
import Category from "@/models/category";
import Product from "@/models/product";
import Ticket from "@/models/ticket";
import User from "@/models/user";
import { ObjectId } from "mongodb";

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

export async function fetchOneProduct(productId) {
  const productIdObj = new ObjectId(productId);
  await connectMongoDB();

  try {
    const data = await Product.findById(productIdObj).lean();

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch products!");
  }
}

//users

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

export async function fetchOneUsers(session) {
  const userIdObj = new ObjectId(session.user.id);
  await connectMongoDB();
  try {
    const data = await User.findById(userIdObj).lean();
    const users = JSON.parse(JSON.stringify(data));
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
}

//orders

export async function fetchOrders({ session, type }) {
  const userIdObj = new ObjectId(session.user.id);
  await connectMongoDB();

  try {
    const pdata = await User.findById(userIdObj);
    const data = pdata.orders.filter((item) => {
      if (item.status === type) {
        return item;
      }
    });
    const orders = JSON.parse(JSON.stringify(data));
    return { orders, qty: orders.length };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders!");
  }
}

export async function fetchOrder({ session, orderId }) {
  const userIdObj = new ObjectId(session.user.id);

  await connectMongoDB();

  try {
    const pdata = await User.findById(userIdObj);
    const data = pdata.orders.find((item) => item._id.toString() === orderId);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders!");
  }
}

// brands

export async function fetchBrands() {
  await connectMongoDB();
  try {
    const data = await Brand.find({});
    const pdata = JSON.parse(JSON.stringify(data));
    return { pdata };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch brands!");
  }
}

// tickets Processing

export async function fetchProcessingTickets({ userId }) {
  // const userIdObj = new ObjectId(userId);

  await connectMongoDB();

  try {
    const data = await Ticket.find({});
    const pdata = JSON.parse(JSON.stringify(data));
    return { pdata };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders!");
  }
}
