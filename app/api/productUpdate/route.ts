import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";

import Product from "@/models/product";
import mongoose from "mongoose";

export async function POST(req: any) {
    const { name,characteristics, description, image, category,subcategory, price, sale, salePrice, brand , id } = await req.json();
 
  try {
    const objectId = new mongoose.Types.ObjectId(id);
   
  
    await connectMongoDB();
    await Product.findByIdAndUpdate(
        objectId,
        {$set:
        { name, characteristics, image, description,category,subcategory, price, sale, salePrice, brand },
        })
    return NextResponse.json({ message: "Product has been added." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding product." },
      { status: 500 }
    );
  }
}