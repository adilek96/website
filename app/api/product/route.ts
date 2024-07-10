import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

import Product from "@/models/product";

export async function POST(req: any) {
 
  try {
    const { name,characteristics, description, image, category,subcategory, price, sale, salePrice, brand  } = await req.json();
  
    await connectMongoDB();
    await Product.create({ name, characteristics, image, description,category,subcategory, price, sale, salePrice, brand });

    return NextResponse.json({ message: "Product has been added." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding product." },
      { status: 500 }
    );
  }
}

export async function GET(req: any) {
  const { searchParams } = new URL(req.url);
  const  id  = searchParams.get('id')

  const productIdObj = new ObjectId(id);
  

  

  try {
    await connectMongoDB();
    const data = await Product.findById(productIdObj).lean();
   

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while adding product." },
      { status: 500 }
    );
  }
}