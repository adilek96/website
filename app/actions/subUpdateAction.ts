"use server"
import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ObjectId } from 'mongodb';

export async function subUpdateAction(formData, subId, updateCategory) {
  "use server";
  const title = formData.get("subtitle");
  const path = formData.get("subpath");
  const newTabBoolean = formData.get("subnewtab"); // Convert to boolean
  const newTab = newTabBoolean === "true" ? true : false;
  const subObjId = new ObjectId(subId);
  const objId = new ObjectId(updateCategory.updateCategory);


  try {
    await connectMongoDB();
    await Category.findByIdAndUpdate(
        objId,
        { $set: { "submenu.$[elem].title": title, "submenu.$[elem].path": path, "submenu.$[elem].newTab": newTab } },
        { arrayFilters: [{ "elem._id": subObjId }] }
      );
  } catch (error) {
    console.log(error);
  }
  revalidatePath(`/dashboard/categories/${updateCategory.updateCategory}`);
  redirect(`/dashboard/categories/${updateCategory.updateCategory}`);
}