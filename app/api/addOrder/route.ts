import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { ObjectId } from 'mongodb';
import { NextResponse } from "next/server";



 


export async function POST(req: any) {
  
  const {  
    cashPay,
    cardPay,
    addressId,
    userCart,
    totalPrice,
    userId 
} = await req.json();

  const userIdObj = new ObjectId(userId)
  const addressIdObj =new ObjectId(addressId)

  const method = () => {
    if(cashPay !== null) {
        return cashPay
    } else if (cardPay !== null){
        return cardPay
    } else {
        return "Cash on shipment"
    }
  }

  const items = userCart.map((item) => {
    let realPrice = 0
    if(item.sale) {
       realPrice = item.salePrice
    } else {
       realPrice = item.price
    }
   
    return ({
      productId: new ObjectId(item._id),
      quantity: item.quantity,
      price: realPrice
    })
  })


  // console.log({
  //   productItems,
  //   method,
  //   addressIdObj,
  //   userIdObj,
  //   totalPrice
  // })
  try {
    
    await connectMongoDB();

   await User.findByIdAndUpdate(
      userIdObj,
      {
        $push: {
          orders: {
            items: items,
            totalAmount: totalPrice,
            shippingAddressId: addressIdObj,
          }
        }
      },
      { new: true, runValidators: true }
    );

   
    return NextResponse.json({ message: "Product added to cart" })
  } catch (error) {
    
    return NextResponse.json({ message: "Internal server error" + error })
  }

 


  

}
