"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function subAddAction(formData,  updateCategory) {
  "use server";
  const title = formData.get("subtitle");
  const path = formData.get("subpath");
  const newTabBoolean = formData.get("subnewtab"); // Convert to boolean
  const newTab = newTabBoolean === "true" ? true : false;
  const objId = new ObjectId(updateCategory.updateCategory);
  const newSubmenu = [
    { title, path, newTab}
];

  
try {
  await connectMongoDB();
  await Category.findByIdAndUpdate(
    objId,
    { $push: { submenu: newSubmenu } }, 
    { new: true }
  );
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/dashboard/categories/${updateCategory.updateCategory}`);
  redirect(`/dashboard/categories/${updateCategory.updateCategory}`);
}