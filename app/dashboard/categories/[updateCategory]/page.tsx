import React from "react";
import { connectMongoDB } from "@/lib/mongodb";
import Link from "next/link";
import Category from "@/models/category";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import CategoryUpdatingForm from "@/components/CategoryUpdatingForm";

// async function CategoryAddingAction(formData) {
//   "use server";
//   const title = formData.get("title");
//   const path = formData.get("path");
//   const newTabBoolean = formData.get("newtab"); // Convert to boolean
//   const newTab = newTabBoolean === "true" ? true : false;

//   try {
//     await connectMongoDB();
//     await Category.create({
//       title,
//       path,
//       newTab,
//     });
//   } catch (error) {
//     console.log(error);
//   }
//   revalidatePath("/dashboard/categories");
//   redirect("/dashboard/categories");
// }

export default async function UpdateCategory({
  params,
}: {
  params: { updateCategory: string };
}) {
  return (
    <section className=" flex flex-col items-center justify-center">
      <div className="flex w-[90%] justify-start">
        <Link
          href={"/dashboard/categories"}
          className=" flex w-11  items-center justify-center rounded-md bg-primary py-4 px-9 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp"
        >
          Back
        </Link>
      </div>
      <h1 className="mt-5 text-center text-[30px] font-bold">Add category</h1>
      <CategoryUpdatingForm updateCategory={params.updateCategory} />
    </section>
  );
}
