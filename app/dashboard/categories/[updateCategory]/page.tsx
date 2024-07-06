import React from "react";
import Link from "next/link";
import CategoryUpdatingForm from "@/components/CategoryUpdatingForm";
import AddButton from "@/components/AddButton";

export default async function UpdateCategory({
  params,
}: {
  params: { updateCategory: string };
}) {
  return (
    <section className=" flex flex-col items-center justify-center">
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/categories"}>
          <AddButton buttonText={"Back"} />
        </Link>
      </div>
      <h1 className="mt-5 text-center text-[30px] font-bold">Add category</h1>
      <CategoryUpdatingForm updateCategory={params.updateCategory} />
    </section>
  );
}
