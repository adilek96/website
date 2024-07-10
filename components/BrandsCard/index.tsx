import DeleteSvg from "@/public/images/delete/DeleteSvg";
import React from "react";
import Image from "next/image";

export default function BrandsCard({ item }) {
  return (
    <form
      key={item._id}
      className="w-[250px] rounded-md bg-primary bg-opacity-10 p-5 shadow-md "
    >
      <div>
        <div className="relative flex h-16 w-full items-center justify-center self-center transition-all duration-300 hover:opacity-50">
          <Image src={item.image} alt={item.name} fill />
        </div>

        <div className=" flex justify-end">
          <button data-id={item._id}>
            <DeleteSvg />
          </button>
        </div>
      </div>
    </form>
  );
}
