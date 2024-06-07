import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';



export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const  id  = searchParams.get('id')
  const  query = id ? {_id:  new ObjectId(id)} : {} ;
   
    await connectMongoDB();
    try{
     
    const data = await Category.find(query);
    return NextResponse.json({ data }, { status: 201 });
    }  catch (error) {
      return NextResponse.json(
        { message: "Some is wrong." },
        { status: 500 }
      );
    }
  }


  export async function DELETE(req, res) {
    const { id } = await req.json();
    const objId = new ObjectId(id);
    await connectMongoDB();
    await Category.deleteOne({ _id: objId });
    return NextResponse.json({ message: "Category Deleted" }, { status: 200 });
   
  }