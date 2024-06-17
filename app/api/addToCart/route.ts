
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  
   
  const { productId, userEmail } = await req.json();
  

  if (!productId) {
    return  NextResponse.json({ message: "Product ID is required" })
    
  }

    await connectMongoDB();

  try {
    
    const user = await User.findOne({ email: userEmail});
    
    if (!user) {
        return  NextResponse.json({ message: "User not found" })
       
    }
   

    const existingItemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );
      
    

    if (existingItemIndex !== -1) {
        user.cart[existingItemIndex].quantity += 1;
    } else {
        
      user.cart.push({ productId, quantity: 1 });
      
    }

    await User.findOneAndUpdate(
        { email: userEmail },
        { cart: user.cart } ,
       
      );
    
  
    
    return NextResponse.json({ message: "Product added to cart" })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" + error })

  }
}




export async function DELETE(req: any) {
  
   
  const { productId, userEmail } = await req.json();
  

  if (!productId) {
    return  NextResponse.json({ message: "Product ID is required" })
    
  }

    await connectMongoDB();

  try {
    
    const user = await User.findOne({ email: userEmail});
    
    if (!user) {
        return  NextResponse.json({ message: "User not found" })
       
    }
   

    const existingItemIndex = user.cart.findIndex(
        (item) => item.productId.toString() === productId
      );
      

      if (existingItemIndex !== -1) {
        if (user.cart[existingItemIndex].quantity > 1) {
          user.cart[existingItemIndex].quantity -= 1;
        } else {
          user.cart.splice(existingItemIndex, 1); // Удаление продукта из корзины
        }
      } else {
        return NextResponse.json({ message: "Product not found in cart" }, { status: 404 });
      }
  
          await User.findOneAndUpdate(
            { email: userEmail },
            { cart: user.cart } ,
           
          );
    
    
    return NextResponse.json({ message: "Product added to cart" })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" + error })

  }
}