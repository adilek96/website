"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function categoryUpdateAction(formData,  updateCategory) {
  "use server";
  const title = formData.get("title");
  const path = formData.get("path");
  const newTabBoolean = formData.get("newtab"); // Convert to boolean
  const newTab = newTabBoolean === "true" ? true : false;
  const objId = new ObjectId(updateCategory.updateCategory);

  try {
    await connectMongoDB();
    await Category.findByIdAndUpdate(
        objId,
        { $set:  { title: title, path: path, newtab: newTab } },
      );
  } catch (error) {
    return error;
  }
  revalidatePath(`/dashboard/categories/${updateCategory.updateCategory}`);
  redirect(`/dashboard/categories/${updateCategory.updateCategory}`);
}