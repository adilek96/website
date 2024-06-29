"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import { ObjectId } from 'mongodb';

export const deleteCategoryAction = async (formData) => {
    "use server"
    const  id  = formData.get('delete');
    const objId = new ObjectId(id);
    
  
    try {
        await connectMongoDB();
        await Category.findByIdAndDelete(objId)
    
    } catch (err) {
      console.log(err);
      throw new Error("Failed to delete user!");
    }

    revalidatePath("/dashboard/categories");
  };