import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { NextResponse } from "next/server";

export  async function POST(req) {
  try {
    const { products } = await req.json();
   
    await connectMongoDB();

    
    const savedProducts = [];

    for (const productData of products) {
      const { productId, quantity } = productData;

      // Находим продукт по ID
      const product = await Product.findById(productId);

      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      const productsWithQuantities = {
        ...product.toObject(),
        quantity: quantity,
      }
   



      savedProducts.push(productsWithQuantities); // Добавляем обновленный продукт в массив savedProducts
    }
    return NextResponse.json({ products: savedProducts }, { status: 201 });
  } catch (error) {
    console.error('Error updating products quantity:', error);
    return NextResponse.json({ error: 'Failed to update products quantity' }, { status: 500 });
  }
}