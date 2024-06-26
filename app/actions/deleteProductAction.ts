"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Product from "@/models/product";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';

export const deleteProductAction = async (formData) => {
    "use server"
    const  id  = formData.get('delete');
    const objId = new ObjectId(id);
    
  
    try {
        await connectMongoDB();
        await Product.findByIdAndDelete(objId)
    
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete product!");
    }

    revalidatePath("/dashboard/products");
  };