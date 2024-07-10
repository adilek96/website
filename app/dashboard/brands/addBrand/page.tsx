import { brandAction } from "@/app/actions/brandAction";
import AddButton from "@/components/AddButton";
import Link from "next/link";
import React from "react";

export default function AddBrand() {
  return (
    <section className=" flex flex-col items-center justify-center">
      <div className="flex w-[90%] justify-end">
        <Link href={"/dashboard/brands"}>
          <AddButton buttonText={"Back"} />
        </Link>
      </div>
      <h1 className="mt-5 text-center text-[30px]">Add brand</h1>

      <form action={brandAction} className=" my-10 flex flex-col gap-5">
        <label
          htmlFor="brandname"
          className="mb-3 block text-sm font-medium text-dark dark:text-white"
        >
          Brand name
        </label>
        <input
          type="text"
          name="brandname"
          placeholder="Enter brand name"
          required
          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
        />
        <label
          htmlFor="branlink"
          className="mb-3 block text-sm font-medium text-dark dark:text-white"
        >
          Brand link
        </label>
        <input
          type="text"
          name="brandlink"
          placeholder="Enter brand link"
          required
          className="w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
        />
        <label
          htmlFor="brandimage"
          className="mb-3 block text-sm font-medium text-dark dark:text-white"
        >
          Brand image
        </label>
        <input
          type="file"
          name="brandimage"
          placeholder="Upload brand image"
          required
          className=" w-full rounded-md border border-transparent px-6 py-3 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-input-color dark:shadow-signUp"
        />
        <button className="flex w-full items-center justify-center rounded-md bg-primary px-9 py-4 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
          Add brand
        </button>
      </form>
    </section>
  );
}
