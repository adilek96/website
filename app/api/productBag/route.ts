import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import Product from "@/models/product";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('email');

  await connectMongoDB();

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json(
        { message: "User not found." },
        { status: 404 }
      );
    }

    const productsWithQuantities = await Promise.all(
      user.cart.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          return null;
        }

        return {
          ...product.toObject(),
          quantity: item.quantity,
        };
      })
    );

    // Фильтрация null значений, если какие-то продукты не были найдены
    const filteredProducts = productsWithQuantities.filter(product => product !== null);

    return NextResponse.json({ products: filteredProducts }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}
