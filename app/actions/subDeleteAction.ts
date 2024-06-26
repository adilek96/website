"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function subDeleteAction(id,  updateCategory) {
  "use server";
  const subId = new ObjectId(id);
  const objId = new ObjectId(updateCategory.updateCategory);

 
  try {
    await connectMongoDB();
    await Category.findByIdAndUpdate(
      objId,
      { $pull: { submenu: { _id: subId } } }, // Используем $pull для удаления элемента массива
      { new: true }
    );
  } catch (error) {
    return error;
  }
  revalidatePath(`/dashboard/categories/${updateCategory.updateCategory}`);
  redirect(`/dashboard/categories/${updateCategory.updateCategory}`);
}