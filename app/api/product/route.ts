import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

import Product from "@/models/product";

export async function POST(req: any) {
 
  try {
    const { name,characteristics, description, image, category,subcategory, price } = await req.json();
  
    await connectMongoDB();
    await Product.create({ name, characteristics, image, description,category,subcategory, price });

    return NextResponse.json({ message: "Product has been added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding product." },
      { status: 500 }
    );
  }
}