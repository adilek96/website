import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function GET(req, res) {
   
    await connectMongoDB();
    const data = await User.find({ });
    return NextResponse.json({ data }, { status: 201 });
   
  }

  
export async function DELETE(req, res) {
    const { email } = await req.json();
    await connectMongoDB();
    await User.deleteOne({ email });
    return NextResponse.json({ message: "User Deleted" }, { status: 200 });
   
  }




