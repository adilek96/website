import React from "react";

export default function AddButton({ buttonText }) {
  return (
    <button className="ease-in-up  my-10 rounded-md bg-primary px-3 py-2 text-sm font-bold  text-white transition duration-300 hover:bg-opacity-90 hover:shadow-lg md:px-6 md:text-lg lg:px-4 xl:px-6">
      {buttonText}
    </button>
  );
}
