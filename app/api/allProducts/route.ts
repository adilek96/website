import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { error } from "console";

import { NextResponse } from "next/server";


export async function GET(req, res) {
   
    await connectMongoDB();
    try{
    const data = await Product.find({ });
    return NextResponse.json({ data }, { status: 201 });
    }  catch (error) {
      return NextResponse.json(
        { message: "Some is wrong." },
        { status: 500 }
      );
    }
  }