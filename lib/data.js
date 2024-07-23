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

export async function fetchProcessingTickets({ userId, status }) {
  const userIdObj = userId ? new ObjectId(userId) : null;

  const query = { status };
  if (userIdObj) {
    query.userId = userIdObj;
  }

  await connectMongoDB();

  try {
    const data = await Ticket.find(query);
    const pdata = JSON.parse(JSON.stringify(data));
    return { pdata };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders!");
  }
}

export async function fetchAllTickets() {
  await connectMongoDB();

  try {
    const data = await Ticket.find();
    const pdata = JSON.parse(JSON.stringify(data));
    return { pdata };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders!");
  }
}

//orders

export async function fetchAllOrders({ type }) {
  await connectMongoDB();
  try {
    const users = await User.find({}).exec();

    let allOrders = [];
    users.forEach((user) => {
      if (user.orders && user.orders.length > 0) {
        user.orders.forEach((order) => {
          allOrders.push({
            ...order.toObject(),
            userId: user._id,
          });
        });
      }
    });

    const filteredOrders = allOrders.filter((item) => {
      if (item.status === type) {
        return item;
      }
    });

    const pdata = JSON.parse(JSON.stringify(filteredOrders));
    return { pdata };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch orders!");
  }
}
