import React from "react";
import Link from "next/link";
import CategoryUpdatingForm from "@/components/CategoryUpdatingForm";

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
