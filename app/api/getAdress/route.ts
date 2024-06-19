import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import { ObjectId } from 'mongodb';



export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const  id  = searchParams.get('id')
  const  addressId  = searchParams.get('addressId');
  const  userId = new ObjectId(id);
  const addressObjId = new ObjectId(addressId);
  
   
   
    try{
        await connectMongoDB();
    const data = await User.findById({_id: userId});

    if(addressId !== null) {
      data.addresses = data.addresses.filter(
        address => address._id.equals(addressObjId)
    );
    }
   
    


    if (data) {
        return NextResponse.json(  data.addresses || null , { status: 200 });
      } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
    
    }  catch (error) {
      return NextResponse.json(
        { message: "Some is wrong." },
        { status: 500 }
      );
    }
  }


  export async function DELETE(req, res) {
    const { searchParams } = new URL(req.url);
    const  userId  = searchParams.get('userId');
    const  addressId  = searchParams.get('addressId');
    const userObjId = new ObjectId(userId);
    const addressObjId = new ObjectId(addressId);
    
    try{
      await connectMongoDB();
      const user = await User.findById({_id: userObjId});

      
      if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    user.addresses = user.addresses.filter(
      address => !address._id.equals(addressObjId)
  );


  const data = await User.findByIdAndUpdate(
    {_id: userObjId},
    { addresses: user.addresses } ,
   
  );

  if (data) {
    return NextResponse.json(  data.addresses || null , { status: 200 });
  } else {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }
  
  }  catch (error) {
    return NextResponse.json(
      { message: "Some is wrong." },
      { status: 500 }
    );
  }
  }