"use server"
import { connectMongoDB } from "@/lib/mongodb";

import { revalidatePath } from "next/cache";
import User from "@/models/user";

export async function cancelOrderAction(formData) {
  "use server";
  const userId = formData.get("userId");
  const orderId = formData.get("orderId");
  const status = formData.get("status");

 try {
    await connectMongoDB();
    await User.findOneAndUpdate(
        { _id: userId, "orders._id": orderId },
        { $set: { "orders.$.status": status } }
      );
 } catch (error) {
    return error
 }

  revalidatePath(`/dashboard/orders/Pending`);

}