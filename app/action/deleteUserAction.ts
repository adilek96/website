"use server"
import { connectMongoDB } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';
import User from "@/models/user";

export const deleteUserAction = async (formData) => {
    "use server"
    const  id  = formData.get('delete');
    const objId = new ObjectId(id);
    
  
    try {
        await connectMongoDB();
        await User.findByIdAndDelete(objId)
    
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/users");
  };