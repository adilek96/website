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
      <h1 className="mt-5 text-center text-[30px]">Add product</h1>
      <form className="mb-10 mt-10 w-[90%]">
        <div className=" flex gap-5"></div>
      </form>
    </section>
  );
}
