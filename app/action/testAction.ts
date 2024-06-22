"use server"
import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';



 


export async function testAction(formData, totalPrice, userCart, userId ) {
  "use server";

  const cashPay = formData.get("cashPay");
  const cardPay = formData.get("cardPay");
  const addressId = formData.get("addressId");
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

   const updatedUser = await User.findByIdAndUpdate(
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

    console.log(updatedUser)

  } catch (error) {
    
   return error
  }

 


  

}
