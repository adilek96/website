import React from "react";
import { connectMongoDB } from "@/lib/mongodb";
import Link from "next/link";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import CategoryForm from "@/components/CategoryAddingForm/CategoryForm";
import { redirect } from "next/navigation";
import AddButton from "@/components/AddButton";

async function CategoryAddingAction(formData) {
  "use server";
  const title = formData.get("title");
  const path = formData.get("path");
  const newTabBoolean = formData.get("newtab"); // Convert to boolean
  const newTab = newTabBoolean === "true" ? true : false;

  try {
    await connectMongoDB();
    await Category.create({
      title,
      path,
      newTab,
    });
  } catch (error) {
    console.log(error);
  }
  revalidatePath("/dashboard/categories");
  redirect("/dashboard/categories");
}

export default async function AddCategory() {
  return (
    <section className=" flex flex-col items-center justify-center">
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/categories"}>
          <AddButton buttonText={"Back"} />
        </Link>
      </div>
      <h1 className="mt-5 text-center text-[30px] font-bold">Add category</h1>
      <CategoryForm CategoryAddingAction={CategoryAddingAction} />
    </section>
  );
}
