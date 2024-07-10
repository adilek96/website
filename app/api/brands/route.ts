import { connectMongoDB } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Brand from "@/models/brand"



export async function GET(req) {

    await connectMongoDB();
    try{
     
    const data = await Brand.find({});
 
    return NextResponse.json({ data}, { status: 200 });
    }  catch (error) {
      return NextResponse.json(
        { message: "Some is wrong." },
        { status: 500 }
      );
    }
  }